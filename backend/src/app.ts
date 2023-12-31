import express, { Request, Response } from 'express'
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as db from './modules/database.js'
import { getCurrentDate, getDateString, logDate } from './modules/date.js'
import { transporter } from './modules/email.js'
import { generatePassword, checkToken, parseJWTpayload, hashPassword, comparePassword } from './modules/auth.js'
import type { jwtPayload } from './modules/auth.js'

dotenv.config();
const port = process.env.APP_PORT as unknown as number;
const jwtSecret = process.env.JWT_SECRET as unknown as string;
const app = express();
app.use(cors()); //allow access from the same origin (delete if not needed)
app.use(express.json());

//signup student from form
app.post("/auth/register/student", checkToken, async (req: Request, res: Response) => {
    try {
        //---Token validation---
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        //---Get supervisor data---
        const supervisor = await db.getSupervisor(payload.id);
        //---Data initialization---
        const firstname = req.body.firstname as string;
        const lastname = req.body.lastname as string;
        const index = req.body.index as string;
        const areaId = req.body.areaId as number;
        const group = req.body.group as string;
        const password = generatePassword();
        const gelearn = `${index}@g.elearn.uz.zgora.pl`;
        const zimbra = `${index}@poczta.stud.uz.zgora.pl`;
        //---Insert user and student---
        const user = await db.insertUser(index, await hashPassword(password), "student");
        const userId = user.insertId;
        await db.insertStudent(firstname, lastname, index, areaId, group, userId);

        //---Send Mail----
        // await transporter.sendMail({
        //     from: `"${supervisor.firstname} ${supervisor.lastname}" <${supervisor.email}>`, // sender address
        //     to: `${zimbra}, ${gelearn}`, // list of receivers
        //     subject: "Konto", // Subject line
        //     html: `Utworzono konto systemie zarządzania praktykami studenckimi. <br>
        //             Twoje dane logowania to: <br>
        //             login: ${index} <br>
        //             hasło: ${password}
        //             `, // html body
        // });
        res.sendStatus(201);
    }
    catch {
        res.sendStatus(500);
    }
})

//signup student from csv file
app.post("/auth/register/student/file", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        type StudentData = {
            firstname :string
            lastname: string
            indexNum: string
            studGroup: string
            area: string
        }
        const areas = await db.getAreas(payload.id);
        req.body.students.forEach(async (student: StudentData) => {
            const name = student.firstname as string;
            const lastname = student.lastname as string;
            const index = student.indexNum as string;
            const areaString = student.area as string;
            const group = student.studGroup as string;
            const password = generatePassword();
            const gelearn = `${index}@g.elearn.uz.zgora.pl`;
            const zimbra = `${index}@poczta.stud.uz.zgora.pl`;
            
            let areaId;
            if(areas) {
                for(let i=0; i<areas?.length; i++) {
                    if(areaString === await areas[i].areaName) {
                        areaId = await areas[i].id;
                        break;
                    }
                }
            }
            
            const user = await db.insertUser(index, await hashPassword(password), "student");
            const userId = user.insertId;
            await db.insertStudent(name, lastname, index, areaId, group, userId);

            // await transporter.sendMail({
            //     from: `"${supervisor.firstname} ${supervisor.lastname}" <${supervisor.email}>`, // sender address
            //     to: `${zimbra}, ${gelearn}`, // list of receivers
            //     subject: "Konto", // Subject line
            //     html: `Utworzono konto systemie zarządzania praktykami studenckimi. <br>
            //             Twoje dane logowania to: <br>
            //             login: ${index} <br>
            //             hasło: ${password}
            //             `, // html body
            // });
        });
        res.sendStatus(201);
    }
    catch {
        res.sendStatus(500);
    }
})


//login user
app.post("/auth/login", async (req: Request, res: Response) => {
    try {
        //get data from request body
        const username = req.body.username as string;
        const password = req.body.password as string;
        //query database
        const user = await db.searchUser(username);
        //check if user exist
        if (user === "notfound") {
            res.sendStatus(404);
            return;
        }
        //compare password with hashed password in db
        if (await comparePassword(password, user.userPassword) === false) {
            res.sendStatus(404);
            return;
        }
        const payload: jwtPayload = { "id": user.id, "role": user.userRole }; // data to serialize
        const token = jsonwebtoken.sign(payload, jwtSecret); // signing web token
        res.json({
            "token": token,
            "id": user.id,
            "role": user.userRole
        }).status(200); // send response
    }
    catch {
        res.sendStatus(500);
    }
})

//update user password
app.put("/auth/password", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        const newPassword = req.body.password as string;
        const hashedPassword = await hashPassword(newPassword);
        await db.updatePassword(payload.id, hashedPassword);
        res.sendStatus(200);
    }
    catch {
        res.sendStatus(500);
    }
    
})

//get all practices preview data
app.get("/practices/preview", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const result = await db.getAllPractices(payload.id);
        if (result === "notfound") {
            res.sendStatus(404);
            return;
        }
        res.send(result).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

// logged student info
app.get("/practices/me", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "student") {
            res.sendStatus(403);
            return;
        }
        const result = await db.getMyPractice(payload.id);
        res.send(result).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

//get practice data by id
app.get("/practices/:id", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const result = await db.getPractice(req.params.id as unknown as number)
        if (result === "notfound") {
            res.sendStatus(404);
            return;
        }
        res.send(result).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

//post practice
app.post("/practices", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const studentId = req.body.studentId as number;
        const companyName = req.body.companyName as string;
        const companyAdress = req.body.companyAddress as string;
        const typeOfpractice =  req.body.typeOfpractice as string
        const nip = req.body.nip as string;
        const regon = req.body.regon as string;
        const practiceStatus = 1;
        const semesterNumber =  req.body.semesterNumber as number;
        const startDate = req.body.startDate as string;
        const endDate = req.body.endDate as string;
        const numOfHours = req.body.numOfHours as number;

        await db.insertPractice(studentId, typeOfpractice, companyName, companyAdress, nip, regon, practiceStatus, semesterNumber, startDate, endDate, numOfHours);
        await db.insertLog(studentId, "Dodanie praktyki", getCurrentDate());
        await db.insertLog(studentId, "Zmiana statusu na Nowa praktyka", getCurrentDate());
    }
    catch {
        res.sendStatus(500);
    }
})

//status change
app.put("/practices/:id/status", checkToken, async (req: Request, res: Response) => {
    const payload = parseJWTpayload(req.body.token as string);
    if (payload.role !== "supervisor") {
        res.sendStatus(403);
        return;
    }
    const supervisor = await db.getSupervisor(payload.id);
    const index = req.body.studentIndex as number;
    const statusId = req.body.statusId as number;
    const statusName = req.body.statusName;
    const practiceId = req.params.id as unknown as number;
    const gelearn = `${index}@g.elearn.uz.zgora.pl`;
    const zimbra = `${index}@poczta.stud.uz.zgora.pl`;
    await db.updateStatus(statusId, practiceId);
    await db.insertLog(practiceId, "Zmiana stususu na "+statusName, getCurrentDate());

    // await transporter.sendMail({
    //     from: `"${supervisor.firstname} ${supervisor.lastname}" <${supervisor.email}>`, // sender address
    //     to: `${zimbra}, ${gelearn}`, // list of receivers
    //     subject: "Zmiana statusu praktyki", // Subject line
    //     html: `Twój status praktyki zmienił się na: <b>${statusName}</b>`, // html body
    // });
    res.sendStatus(200);
})

//get list of students
app.get("/students", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const students = await db.getStudents(payload.id);
        if (students.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.send(students).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

app.put("/students", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const id = req.body.id as number;
        const firstname = req.body.firstname as string;
        const lastname = req.body.lastname as string;
        const indexNum = req.body.indexNum as string;
        const studGroup = req.body.studGroup as string;
        const specialty = req.body.specialty as string;
        const areaid = req.body.areaId as number;
        await db.updateStudent(id, firstname, lastname, indexNum, studGroup, specialty, areaid);
        res.sendStatus(200);
    }
    catch {
        res.sendStatus(500);
    }
    
})

app.delete("/students/:id", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
        const id = req.params.id as unknown as number;
        await db.deletePractice(id);
        await db.deleteStudent(id);
        res.sendStatus(200);
    }
    catch {
        res.sendStatus(500);
    }
})

//get logs
app.get("/logs/:id", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.status(403);
            return;
        }
        const logs = await db.getLogs(parseInt(req.params.id));
        if (logs === "notfound") {
            res.sendStatus(404);
            return;
        }
        res.send(logs).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

//get list of statuses
app.get("/statuses", async (req: Request, res: Response) => {
    try {
        const statuses = await db.getAllStatuses();
        res.send(statuses).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

//get list of areas
app.get("/areas", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        const areas = await db.getAreas(payload.id);
        res.send(areas).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})

app.get("/filterdata", checkToken, async (req: Request, res: Response) => {
    try {
        const payload = parseJWTpayload(req.body.token as string);
        const statuses = await db.getAllStatuses();
        const areas = await db.getAreas(payload.id);
        const data = {statuses, areas};
        res.send(data).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})


app.listen(port, () => console.log(getDateString() + " Serwer uruchomiony na porcie " + port));
