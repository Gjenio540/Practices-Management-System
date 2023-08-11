import { useState, useEffect } from "react";
import { getToken } from "../modules/auth";
import { host } from '../modules/env';
import Loading from "../components/Loading";
import Error from "../components/Error";


const StudentPage = () => {
    const [studentData, setStudentData] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(true);

    useEffect(() => {
        async function getStudentData() {
            setLoading(true);
            try {
                const token = getToken();
                const data = await fetch(`${host}/`,{
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
                setStudentData(json);
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
        <h1>Student view 👩‍🎓</h1>
    );
}

export default StudentPage
