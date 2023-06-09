import express, {NextFunction, Request, Response} from 'express'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { searchUser, insertUser, insertStudent } from './modules/database.js'
import { logDate } from './modules/date.js'
import { transporter } from './modules/email.js'
import { generatePassword, checkToken, parseJWTpayload } from './modules/auth.js'
import type { jwtPayload } from './modules/auth.js'

dotenv.config();
const port = process.env.APP_PORT as unknown as number;
const jwtSecret = process.env.JWT_SECRET as unknown as string;
const app = express();
app.use(express.json());
app.use(checkToken); //use checkToken() before main function

// app.get("/students", async (req: Request, res: Response) => {
//     const student = await getStudents();
//     res.send(student).status(200);
//     //console.log(logDate()+" get /students "+res.statusCode);
// })

// app.post("/test/register", checkToken, async (req: Request, res: Response) => {
//     const payload = parseJWTpayload(req.body.token as string);

//     if (payload.role !== "supervisor") {
//         res.sendStatus(403);
//         return;
//     }

//     const password = generatePassword();
//     const user = await insertUser(req.body.username, password, "student");
//     res.send(user).status(200);
// })

//signup student
app.post("/auth/register/student", checkToken, async (req: Request, res: Response) => {
    try {
        //---Token validation---
        const payload = parseJWTpayload(req.body.token as string);
        if (payload.role !== "supervisor") {
            res.sendStatus(403);
            return;
        }
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
        const user = await insertUser(req.body.username, password, "student");
        const userId = user.insertId;
        const student = await insertStudent(name, lastname, index, areaId, group, userId);
        //---Check DB errors---

        //---Send Mail----
        await transporter.sendMail({
            from: '"FROM" <foo@example.com>', // sender address
            to: `${zimbra}, ${gelearn}`, // list of receivers
            subject: "Konto", // Subject line
            html:  `Utworzono konto systemie zarządzania praktykami studenckimi. <br>
                    Twoje dane logowania to: <br>
                    login: ${index} <br>
                    hasło: ${password}
                    `, // html body
        });
        res.sendStatus(200);
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
        const user = await searchUser(username, password);
        //check if user exist
        if (user === "notfound") {
            res.sendStatus(404);
            return;
        }
        const payload: jwtPayload = {"id": user.id, "role": user.role }; // data to serialize
        const token = jsonwebtoken.sign(payload, jwtSecret); // signing web token
        res.json({
            "token": token,
            "id": user.id,
            "role": user.role
        }).status(200); // send response
    }
    catch {
        res.sendStatus(500);
    }
})

//get all practices
app.get("/practices", async (req: Request, res: Response) => {
    try {
        // const parsedPayload = parseJWTpayload();
        // if (parsedPayload.role !== "student") {
        //     res.sendStatus(403);
        //     return;
        // }
    }
    catch {
        res.status(500);
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
    }
    catch {
        res.status(500);
    }
})

//status change
app.put("", async (req: Request, res: Response) => {
    const index = req.body.index as number;
    const gelearn = `${index}@g.elearn.uz.zgora.pl`;
    const zimbra = `${index}@poczta.stud.uz.zgora.pl`;

    let mail = await transporter.sendMail({
        from: '"FROM" <foo@example.com>', // sender address
        to: `${zimbra}, ${gelearn}`, // list of receivers
        subject: "Zmiana statusu praktyki", // Subject line
        html: "Treść", // html body
    });
})


app.listen(port, () => console.log(logDate() + " Serwer uruchomiony na porcie " + port));
