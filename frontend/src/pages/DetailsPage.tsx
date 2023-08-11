import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../modules/auth';
import { host } from '../modules/env';

const DatailsPage = () => {
    const { id } = useParams<string>();
    const [practiceData, setPracticeData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
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
                    setError(true);
                    return;
                }
                const json = await data.json();
                setPracticeData(json);
            }
            catch {
                setLoading(false);
                setError(true);
            }
        }
        getData();
    }, [])

    return(
        <h1>Details Page 📋</h1>
    );
}

export default DatailsPage
