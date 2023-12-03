import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getToken } from "../modules/auth"
import { host } from "../modules/env"
import { studentData } from "../modules/interfaces"
import Loading from "../components/Loading"
import Error from "../components/Error"
import styles from "./sass/StudentsPage.module.scss"

const StudentsPage = () => {
    const [reload, setReload] = useState<number>(0);
    const [data, setData] = useState<studentData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getData(): Promise<void> {
            try {
                const response = await fetch(host+"/students", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    }
                })
                if(!response.ok) {
                    setLoading(false);
                    setError(response.status + response.statusText);
                    return;
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
            }
            catch {
                setLoading(false);
                setError("Błąd połaczenia z serwerem");
            }
        }
        getData();
    }, [reload])

    async function deleteStudent(id: number): Promise<void> {
        try {
            const response = await fetch(host+"/students/"+id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application-json',
                    'Authorization': 'Bearer '+getToken()
                }
            })
            if(!response.ok) {
                setError("Błąd");
                setInterval(() => setError(""), 1500);
                return;
            }
            setError("Usunięto studenta");
            setInterval(() => setError(""), 1500);
            setReload(reload+1)
        }
        catch {
            setError("Błąd");
            setInterval(() => setError(""), 1500);
        }
    }

    if(loading)
        return <Loading />
    
    if(error)
        return <Error message={error} />

    return(
        <>
        <h1 className="centeredText">Lista studentów</h1>
        {data?.map(students => (
            <div className={styles.student} key={students.id}>
                <p key={students.firstname}>{students.firstname}</p>
                <p key={students.lastname}>{students.lastname}</p>
                <p key={students.indexNum}>{students.indexNum}</p>
                <p key={students.studGroup}>{students.studGroup}</p>
                <p key={students.areaName}>{students.areaName}</p>
                <p key={students.specialty}>{students.specialty}</p>
                <Link to={"/studenci/dane"} className="button bt-blue" state={students}>Edytuj</Link>
                <Link to={"/studenci/praktyka"} className="button bt-blue" state={students}>Dodaj praktyke</Link>
                <button className="button bt-red" onClick={() => deleteStudent(students.id)}>Usuń</button>
            </div>
       ))}
        </>
    )
}

export default StudentsPage