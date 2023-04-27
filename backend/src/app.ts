import express, {Request, Response} from 'express'

const app = express()

app.get("/", async (req: Request, res: Response) => {
    res.send("This is the response")
})

app.listen(3000, () => console.log("Serwer uruchomiony"))
