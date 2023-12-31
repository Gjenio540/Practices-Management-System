import { FormEvent, useState, useEffect, useRef } from "react"
import { getToken } from "../modules/auth";
import { host } from "../modules/env";
import { areaData } from "../modules/interfaces";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "./sass/EditDataPage.module.scss"

const AddStudentsPage = () => {

    const [data, setData] = useState<areaData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const fileRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLInputElement>(null);
    const indexRef = useRef<HTMLInputElement>(null);
    const areaRef = useRef<HTMLSelectElement>(null);

    type StudentData = {
        firstname :string
        lastname: string
        indexNum: string
        studGroup: string
        area: string
    }

    type students = {
        "students": StudentData[]
    }

    useEffect(() => {
        async function getAreas() {
            const response = await fetch(host+"/areas", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            const json = await response.json();
            setData(json);
            setLoading(false);
        }
        getAreas();
    }, [])

    async function handleSubmitFile(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        let files = fileRef.current?.files;
        if(files) {
            let data = await files[0].text();
            let rows = data.split(/[\n\r]+/);
            let words: string[] = [];
            let body: students = {"students": []};
            for(let i=1; i<rows.length; i++) {
                words = rows[i].split(';')
                body.students.push({"firstname": words[0],"lastname": words[1],"indexNum": words[2], "studGroup": words[3], "area": words[4]})
            }

            const response = await fetch(host+"/auth/register/student/file",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(body)
            })

            if(response.ok) {
                setError("Doddano studentów");
                setInterval(() => setError(""), 1500);
            }

            else if(!response.ok) {
                setError(response.status+response.statusText);
                setInterval(() => setError(""), 1500);
            }
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const body = {
            "firstname": firstnameRef.current?.value,
            "lastname": lastnameRef.current?.value,
            "index": indexRef.current?.value,
            "group": groupRef.current?.value,
            "areaId": areaRef.current?.value
        };
        const response = await fetch(host+"/auth/register/student",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(body)
        });
    }

    if(loading)
        return <Loading/>
    
    if(error)
        return <Error message={error}/>
        

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmitFile}>
                    <h1>Dodaj studentów z pliku .csv</h1>
                    <input ref={fileRef} type="file" accept="text/csv" required/>
                    <input className="button bt-green" type="submit" value="Wyślij plik" />
                </form>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.data}>
                        <h1>Dodaj studenta z formularza</h1>
                            <label htmlFor="firstname">Imię</label>
                            <input type="text" id="firstname" ref={firstnameRef} required/>
                            <label htmlFor="lastname">Nazwisko</label>
                            <input type="text" id="lastname" ref={lastnameRef}/>
                            <label htmlFor="index">Numer indeksu</label>
                            <input type="text" id="index" ref={indexRef}/>
                            <label htmlFor="group">Grupa</label>
                            <input type="text" id="group" ref={groupRef}/>
                            <label htmlFor="area">Kierunek</label>
                            <select name="" id="area" ref={areaRef}>
                                {data?.map((area) => (
                                    <option value={area.id}>{area.areaName}</option>
                                ))}
                            </select>
                            <div className={styles.options}>
                                <input className="button bt-green" type="submit" value="Dodaj studenta" />
                            </div>
                        </div>
                </form>
            </div>
        </div>
    
    )
}

export default AddStudentsPage
