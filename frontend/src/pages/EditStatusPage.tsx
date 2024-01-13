import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { host } from "../modules/env";
import { getToken, getUser, getRole } from "../modules/auth";
import { statusData } from "../modules/interfaces";
import Error from "../components/Error";
import Loading from "../components/Loading";
import styles from "./sass/EditStatusPage.module.scss"

const EditStatus = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<statusData[]>();
    const statusRef = useRef<HTMLSelectElement>(null);
    const { state } = useLocation();
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
        async function getStatusData(): Promise<void> {
            try {
                const data = await fetch(host+"/statuses");
                if(!data.ok) {
                    setLoading(false);
                    setError("Nie udało się pobrać danych");
                    return;
                }
                const json = await data.json();
                setData(json);
                setLoading(false);
            }
            catch {
                setLoading(false);
                setError("Nie udało się pobrać danych");
            }
        }
        getStatusData();
    }, [])

    async function handleStatusChange(): Promise<void> {
        try {
            const data = await fetch(host+"/practices/"+state.practiceId+"/status", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+getToken()
                },
                body: JSON.stringify({
                    "studentIndex": state.indexNum,
                    "statusId": statusRef.current?.value,
                    "statusName": statusRef.current?.options[statusRef.current?.value as unknown as number-1].text
                })
            })
            if(!data.ok) {
                setError("Nie udało się zmienić statusu");
                setInterval(() => {
                    setError("");
                }, 2000)
                return;
            }
            navigate(-1);
        }
        catch {
            setError("Coś poszło nie tak");
        }
    }

    if(loading)
        return (<Loading/>)

    if(error)
        return (<Error message={error}/>)

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <h1>Zmień status na:</h1>
                <select ref={statusRef}>
                    {data?.map(data => (
                        <option  key={data.id} value={data.id}>{data.statusName}</option>
                    ))}
                </select>
                <div className={styles.options}>
                    <button className="button bt-green" onClick={handleStatusChange}>Potwierdź</button>
                    <button type="button" className="button bt-red" onClick={() => navigate(-1)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}

export default EditStatus
