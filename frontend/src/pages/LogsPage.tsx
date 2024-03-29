import {useState, useEffect } from "react"
import { logData, practiceData } from "../modules/interfaces"
import { host } from "../modules/env";
import { getToken, getUser, getRole } from "../modules/auth";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./sass/EditDataPage.module.scss";

const LogsPage = () => {
    const [data, setData] = useState<logData[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const state: practiceData = useLocation().state
    const navigate = useNavigate();

    useEffect(() => {
        if(!getUser()) {
            navigate("/logowanie")
        }
        else if (getRole() !== "supervisor") {
            navigate("/praktyki/me")
        }
    }, [])

    useEffect(() => {
        async function getLogs() {
                console.log(state.studentId)
                if(state.studentId)
                {
                    setLoading(true)
                    const response = await fetch(host+"/logs/"+state.studentId, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                    })
                    if(response.status === 404) {
                        setLoading(false);
                        setError("404");
                        return
                    }
                    if(response.ok)
                    {
                        setData (await response.json());
                        setLoading(false);
                        return
                    }
                    if(!response.ok)
                    {
                        setLoading(false);
                        setError(response.statusText)
                        return
                    }
            }
            
        }
        getLogs();
    }, [])

    if(loading) {
        return(<Loading/>)
    }

    if(error) {
        return (<h1>Brak logów do wyświetlenia</h1>)
    }

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <h1>Historia zmian danych {state.firstname} {state.lastname}</h1>
                {data?.map(log => {
                    let date = new Date(log.logDate);
                    return(
                    <div key={log.id}>
                        <h2>[{date.toLocaleDateString("pl-PL")}] {log.logMsg}</h2>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LogsPage
