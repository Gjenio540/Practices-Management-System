import {useState, useEffect } from "react"
import { logData, logProps } from "../modules/interfaces"
import { host } from "../modules/env";
import { getToken } from "../modules/auth";

const Logs = (props: logProps) => {
    const [data, setData] = useState<logData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function getLogs() {
            if(props.id)
            {
                const response = await fetch(host+"/logs/"+props.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    },
                })
                if(response.status === 404) {
                    setLoading(false);
                    setError(true);
                    return
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
            }
            }
        getLogs();
    }, [])

    if(loading) {
        return(<></>)
    }

    if(error) {
        return (<h1>Brak logów do wyświetlenia</h1>)
    }

    return(
        <div>
            <h2>Logi</h2>
            {data?.map(log => {
                let date = new Date(log.logDate);
                return(
                <div key={log.id}>
                    <p>[{date.toLocaleDateString("pl-PL")}] {log.logMsg}</p>
                </div>
                )
            })}
        </div>

        )
}
export default Logs