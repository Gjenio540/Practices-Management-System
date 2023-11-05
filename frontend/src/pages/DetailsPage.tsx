import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToken } from '../modules/auth';
import { host } from '../modules/env';
import ChangeStatusModal from '../components/ChangeStatusModal';
import ChangeDataModal from '../components/ChangeDataModal';
import styles from '../pages/sass/DetailPage.module.scss'
import Loading from '../components/Loading';
import Error from '../components/Error';
import { practiceData } from '../modules/interfaces';

const DatailsPage = () => {

    const { id } = useParams<string>();
    const [data, setData] = useState<practiceData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const [openDataModal, setOpenDataModal] = useState<boolean>(false);

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

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>{data?.firstname+" "+data?.lastname}</h1>
                    <h2>{"Grupa: "+data?.studGroup}</h2>
                    <h2>{"Kierunek: "+data?.areaName}</h2>
                    <h2>{"Nazwa zakładu: "+data?.companyName}</h2>
                    <h2>{"Status praktyki: "+data?.statusName}</h2>
                </div>
                <div className={styles.options}>
                    <button className="button bt-blue" onClick={() => {setOpenDataModal(true)}}>Edytuj dane</button>
                    <button className="button bt-blue" onClick={() => {setOpenStatusModal(true)}}>Zmień status</button>
                    <Link className="button bt-red" to={"/praktyki"}>Powrót</Link>
                </div>
            </div>
            <ChangeStatusModal open={openStatusModal} setOpen={setOpenStatusModal} data={data}/>
            <ChangeDataModal open={openDataModal} setOpen={setOpenDataModal} data={data}/>
        </div>
    );
}

export default DatailsPage
