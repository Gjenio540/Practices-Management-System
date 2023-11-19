import express, { Request, Response } from 'express'
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as db from './modules/database.js'
import { logDate } from './modules/date.js'
import { transporter } from './modules/email.js'
import { generatePassword, checkToken, parseJWTpayload, hashPassword, comparePassword } from './modules/auth.js'
import type { jwtPayload } from './modules/auth.js'

dotenv.config();
const port = process.env.APP_PORT as unknown as number;
const jwtSecret = process.env.JWT_SECRET as unknown as string;
const app = express();
app.use(cors()); //allow access from the same origin
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
        const name = req.body.name as string;
        const lastname = req.body.lastname as string;
        const index = req.body.index as string;
        const areaId = req.body.areaId as number;
        const group = req.body.group as string;
        const password = generatePassword();
        const gelearn = `${index}@g.elearn.uz.zgora.pl`;
        const zimbra = `${index}@poczta.stud.uz.zgora.pl`;
        //---Insert user and student---
        const user = await db.insertUser(req.body.index, await hashPassword(password), "student");
        const userId = user.insertId;
        const student = await db.insertStudent(name, lastname, index, areaId, group, userId);
        //---Check DB status---

        //---Send Mail----
        await transporter.sendMail({
            from: `"${supervisor.firstname} ${supervisor.lastname}" <${supervisor.email}>`, // sender address
            to: `${zimbra}, ${gelearn}`, // list of receivers
            subject: "Konto", // Subject line
            html: `Utworzono konto systemie zarządzania praktykami studenckimi. <br>
                    Twoje dane logowania to: <br>
                    login: ${index} <br>
                    hasło: ${password}
                    `, // html body
        });
        res.sendStatus(201);
    }
    catch {
        res.sendStatus(500);
    }
})

//signup student from csv file
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
        type StudentData = {
            firstname :string
            lastname: string
            indexNum: string
            studGroup: string
            area: string
        }

        req.body.students.forEach(async (student: StudentData) => {
            const name = req.body.name as string;
            const lastname = req.body.lastname as string;
            const index = req.body.index as string;
            const areaId = req.body.areaId as number;
            const group = req.body.group as string;
            const password = generatePassword();
            const gelearn = `${student.indexNum}@g.elearn.uz.zgora.pl`;
            const zimbra = `${student.indexNum}@poczta.stud.uz.zgora.pl`;

            const user = await db.insertUser(req.body.index, await hashPassword(password), "student");
            const userId = user.insertId;
            await db.insertStudent(name, lastname, index, areaId, group, userId);

            await transporter.sendMail({
                from: `"${supervisor.firstname} ${supervisor.lastname}" <${supervisor.email}>`, // sender address
                to: `${zimbra}, ${gelearn}`, // list of receivers
                subject: "Konto", // Subject line
                html: `Utworzono konto systemie zarządzania praktykami studenckimi. <br>
                        Twoje dane logowania to: <br>
                        login: ${index} <br>
                        hasło: ${password}
                        `, // html body
            });
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
        const result = await db.updatePassword(payload.id, hashedPassword);
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
        const students = await db.getStudents();
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

//get list of statuses
app.get("/statuses", async (req: Request, res: Response) => {
    try {
        const statuse = await db.getAllStatuses();
        res.send(statuse).status(200);
    }
    catch {
        res.sendStatus(500);
    }
})



app.listen(port, () => console.log(logDate() + " Serwer uruchomiony na porcie " + port));
