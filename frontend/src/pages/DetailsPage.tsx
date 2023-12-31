import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToken } from '../modules/auth';
import { host } from '../modules/env';
import styles from '../pages/sass/DetailPage.module.scss'
import Loading from '../components/Loading';
import Error from '../components/Error';
import { practiceData } from '../modules/interfaces';
import Logs from '../components/Logs';

const DatailsPage = () => {

    const { id } = useParams<string>();
    const [data, setData] = useState<practiceData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getData(): Promise<void> {
            try {
                setLoading(true);
                const token = getToken();
                const data = await fetch(host+"/practices/"+id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(!data.ok) {
                    setLoading(false);
                    setError(data.status+" "+data.statusText);
                    return;
                }
                const json = await data.json();
                setData(json);
                setLoading(false);
            }
            catch {
                setLoading(false);
                setError("Błąd połączenia z serwerem");
            }
        }
        getData();
    }, [])

    if(loading)
        return(<Loading />)

    if(error)
        return(<Error message={error}/>)

    if(data)
    {
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
                    <div className={styles.options}>
                        <Link className="button bt-blue" to={"/praktyki/dane"} state={data}>Edytuj dane</Link>
                        <Link className="button bt-blue" to={"/praktyki/status"} state={data}>Zmień status</Link>
                        <Link className="button bt-blue" to={"/praktyki/logi"} state={data}>Zobacz logi</Link>
                        <Link className="button bt-red" to={"/praktyki"}>Powrót</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DatailsPage
