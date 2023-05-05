import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import { getStudents } from './modules/database.js'
import { logDate } from './modules/date.js'


dotenv.config()
const port = process.env.APP_PORT as unknown as number
const app = express()

app.get("/students", async (req: Request, res: Response) => {
    const student = await getStudents()
    res.send(student).status(200)
    console.log(logDate()+" get /students "+res.statusCode)
})

app.listen(port, () => console.log(logDate() + " Serwer uruchomiony na porcie " + port))
