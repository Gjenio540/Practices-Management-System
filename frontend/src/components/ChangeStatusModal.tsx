import { useEffect, useState, useRef } from "react";
import { modalProps } from "../modules/interfaces";
import { host } from "../modules/env";
import { statusData } from "../modules/interfaces";
import { getToken } from "../modules/auth";
import styles from './sass/ChangeStatusModal.module.scss';

const ChangeStatusModal = (props: modalProps) => {

    const [data, setData] = useState<statusData[]>();
    const statusRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        async function getStatusData(): Promise<void> {
            const data = await fetch(host+"/statuses");
            if(!data.ok) {
                return;
            }
            const json = await data.json();
            setData(json);
        }
        getStatusData();
    }, [])

    async function handleStatusChange(): Promise<void> {
        console.log(statusRef.current?.value)
        const data = await fetch(host+"/practices/"+props.data?.practiceId+"/status", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getToken()
            },
            body: JSON.stringify({
                "studentIndex": props.data?.indexNum,
                "statusId": statusRef.current?.value
            })
        })
        console.log(data.status);
    }

    if(!props.open) {
        return null;
    }

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
                    <button className="button bt-red" onClick={() => props.setOpen(false)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeStatusModal
