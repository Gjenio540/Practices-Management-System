import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToken } from '../modules/auth';
import { host } from '../modules/env';
import ChangeStatusModal from '../components/ChangeStatusModal';
import ChangeDataModal from '../components/ChangeDataModal';
import styles from '../pages/sass/DetailPage.module.scss'

const DatailsPage = () => {
    const { id } = useParams<string>();
    const [practiceData, setPracticeData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const [openDataModal, setOpenDataModal] = useState<boolean>(false);

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             setLoading(true);
    //             const token = getToken();
    //             const data = await fetch(host+"/practices/"+id,{
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })
    //             if(!data.ok) {
    //                 setLoading(false);
    //                 setError(true);
    //                 return;
    //             }
    //             const json = await data.json();
    //             setPracticeData(json);
    //         }
    //         catch {
    //             setLoading(false);
    //             setError(true);
    //         }
    //     }
    //     getData();
    // }, [])

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>Adam Kowalski</h1>
                    <h2>Grupa: 31INF-PSI-SP</h2>
                    <h2>Kierunek: Informatyka</h2>
                    <h2>Status praktyki: Zaliczona</h2>
                </div>
                <div className={styles.options}>
                    <button className="button bt-blue" onClick={() => {setOpenDataModal(true)}}>Edytuj dane</button>
                    <button className="button bt-blue" onClick={() => {setOpenStatusModal(true)}}>Zmień status</button>
                    <Link className="button bt-red" to={"/praktyki"}>Powrót</Link>
                </div>
            </div>
            <ChangeStatusModal open={openStatusModal} setOpen={setOpenStatusModal}/>
            <ChangeDataModal open={openDataModal} setOpen={setOpenDataModal}/>
        </div>
    );
}

export default DatailsPage
