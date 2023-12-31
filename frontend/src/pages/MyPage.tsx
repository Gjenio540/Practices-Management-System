import { useState, useEffect } from "react";
import { getToken } from "../modules/auth";
import { host } from '../modules/env';
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "./sass/DetailPage.module.scss"
import { practiceData } from "../modules/interfaces";

const MyPage = () => {

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

    if(data) {
        let rawDate = new Date(data.startDate);
        const startDate = rawDate.toLocaleDateString('pl-PL');
        rawDate = new Date(data.endDate);
        const endDate = rawDate.toLocaleDateString('pl-PL');

            return(
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div className={styles.info}>
                            <h1>{data?.firstname+" "+data?.lastname}</h1>
                            <div className={styles.data}>
                                    <h2 className={styles.faded}>Grupa:</h2>
                                    <h2>{data?.studGroup}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Kierunek:</h2>
                                <h2>{data?.areaName}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Rodzaj praktyki:</h2>
                                <h2>{data?.typeOfpractice}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Nazwa firmy:</h2>
                                <h2>{data?.companyName}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Adres firmy:</h2>
                                <h2>{data?.companyAdress}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Data rozpoczęcia praktyki:</h2>
                                <h2>{startDate}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Data zakończenia praktyki:</h2>
                                <h2>{endDate}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Wymiar praktyki:</h2>
                                <h2>{data?.numOfHours+" godzin"}</h2>
                            </div>
                            <div className={styles.data}>
                                <h2 className={styles.faded}>Status praktyki:</h2>
                                <h2>{data?.statusName}</h2>
                            </div>
                        </div>
                    </div>
                </div>     
        );
    }
}

export default MyPage
