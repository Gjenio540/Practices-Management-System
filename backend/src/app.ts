import express, {NextFunction, Request, Response} from 'express'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
// import { getStudents } from './modules/database.js'
import { logDate } from './modules/date.js'
import { transporter } from './modules/email.js'
import { generatePassword, checkToken } from './modules/auth.js'
import type { jwtPayload } from './modules/auth.js'

dotenv.config();
const port = process.env.APP_PORT as unknown as number;
const jwtSecret = process.env.JWT_SECRET as unknown as string;
const app = express();
app.use(express.json());

// app.get("/students", async (req: Request, res: Response) => {
//     const student = await getStudents();
//     res.send(student).status(200);
//     //console.log(logDate()+" get /students "+res.statusCode);
// })

//signup student
app.post("/auth/register/student", async (req: Request, res: Response) => {
    try {
        //---Token validation---

        const password = generatePassword();
        console.log(req.body)
        const index: string = req.body.index;
        const gelearn = `${index}@g.elearn.uz.zgora.pl`;
        const zimbra = `${index}@poczta.stud.uz.zgora.pl`;

        //---DB connection---

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
        const username: string = req.body.username;
        const password: string = req.body.password;
        const user: jwtPayload = {}; // data to serialize

        const token = jsonwebtoken.sign(user, jwtSecret); // signing web token
        res.json({"token": token}).status(200); // send response
    }
    catch {
        res.sendStatus(500);
    }
})

//get all practices
app.get("/practices", async (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    }
    catch {
        res.status(500);
    }
})

//status change
app.put("", async (req: Request, res: Response, next: NextFunction) => {
    next();
    const index = req.body.index;
    const gelearn = `${index}@g.elearn.uz.zgora.pl`;
    const zimbra = `${index}@poczta.stud.uz.zgora.pl`;

    let mail = await transporter.sendMail({
        from: '"FROM" <foo@example.com>', // sender address
        to: `${zimbra}, ${gelearn}`, // list of receivers
        subject: "Zmiana statusu praktyki", // Subject line
        html: "Treść", // html body
    });
})

app.use(checkToken); //use checkToken() as next function
app.listen(port, () => console.log(logDate() + " Serwer uruchomiony na porcie " + port));
