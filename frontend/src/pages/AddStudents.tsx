import { FormEvent, useState, useEffect, useRef } from "react"
import { getToken } from "../modules/auth";
import { host } from "../modules/env";

const Students = () => {

    const fileRef = useRef<HTMLInputElement>(null);
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let files = fileRef.current?.files;
        if(files) {
            let data = await files[0].text()
            let rows = data.split('\n')
            let words: string[] = []
            let body: object[] = [] //array of students (body of request)

            for(let i=1; i<rows.length; i++) {
                words = rows[i].split(';')
                body.push({"firstName": words[0],"lastName": words[1],"indexNum": words[2], "studGroup": words[3], "area": words[4]})
            }

            const response = await fetch(host+"/auth/register/student",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken}`
                },
                body: JSON.stringify(body)
            })
        }
    }
        

    return(
    <>
        <form onSubmit={handleSubmit}>
            <h1>Dodaj studentów z pliku .csv</h1>
            <input ref={fileRef} type="file" name="" id="" accept="text/csv"/>
            <input className="button" type="submit" value="Wyślij plik" />
        </form>
        <div className={""}>
                        <h1>Dane Studenta</h1>
                        <label htmlFor="firstname">Imię</label>
                        <input type="text" id="firstname"/>
                        <label htmlFor="lastname">Nazwisko</label>
                        <input type="text" id="lastname"/>
                        <label htmlFor="indexNumber">Numer indeksu</label>
                        <input type="text" id="lastname"/>
                        <label htmlFor="group">Grupa</label>
                        <input type="text" id="group"/>
                    </div>
    </>
    )
}

export default Students
