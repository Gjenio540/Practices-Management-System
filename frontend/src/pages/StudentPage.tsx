import { useState, useEffect } from "react";
import { getToken } from "../modules/auth";
import { host } from '../modules/env';
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "./sass/DetailPage.module.scss"
import { practiceData } from "../modules/interfaces";

const StudentPage = () => {

    const [data, setData] = useState<practiceData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function getStudentData(): Promise<void> {
            setLoading(true);
            try {
                const token = getToken();
                const data = await fetch(`${host}/practices/me`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!data.ok) {
                    setLoading(false);
                    setError(true);
                    return;
                }
                const json = await data.json();
                setData(json);
                setLoading(false);
            }
            catch {
                setLoading(false);
                setError(true);
            }
        }
        getStudentData();
    }, []);

    if(loading)
        return(<Loading/>);
    if(error)
        return(<Error message={"Error"}/>)    

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>{data?.firstname+" "+data?.lastname}</h1>
                    <h2>{"Grupa: "+data?.studGroup}</h2>
                    <h2>{"Kierunek: "+data?.areaName}</h2>
                    <h2>{"Rodzaj praktyki: "+data?.typeOfpractice}</h2>
                    <h2>{"Nazwa firmy: "+data?.companyName}</h2>
                    <h2>{"Adres firmy: "+data?.companyAdress}</h2>
                    <h2>{"Data rozpoczęcia praktyki: "+data?.startDate}</h2>
                    <h2>{"Data zakończenia praktyki: "+data?.endDate}</h2>
                    <h2>{"Wymiar praktyki: "+data?.numOfHours+" godzin"}</h2>
                    <h2>{"Status praktyki: "+data?.statusName}</h2>
                </div>
            </div>
        </div>
    );
}

export default StudentPage
