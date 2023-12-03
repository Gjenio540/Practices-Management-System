import { useState, useEffect, useRef, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getToken } from "../modules/auth";
import { host } from "../modules/env";
import { areaData } from "../modules/interfaces";
import Loading from "../components/Loading";
import Error from "../components/Error";

const EditStudentDataPage = () => {
    const propsData = useLocation().state;
    const [areaData, setAreaData] = useState<areaData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const indexNumRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLInputElement>(null);
    const areaIdRef = useRef<HTMLSelectElement>(null);
    const specialityRef = useRef<HTMLInputElement>(null);

    console.log(propsData.id)
    useEffect(() => {
        async function getData(): Promise<void> {
            try {
                const response = await fetch(host+"/areas", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    }
                })
                if(!response.ok) {
                    setLoading(false);
                    setError(response.text + response.statusText);
                    return;
                }
                const json = await response.json();
                setAreaData(json);
                setLoading(false);
            } 
            catch {
                setLoading(false);
                setError("Błąd serwera")
            }
        }
        getData();
    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            const response = await fetch(host+"/students", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                        "id": propsData.id,
                        "firstname": firstnameRef.current?.value,
                        "lastname": lastnameRef.current?.value,
                        "indexNum": indexNumRef.current?.value,
                        "studGroup": groupRef.current?.value,
                        "specialty": specialityRef.current?.value,
                        "areaId": areaIdRef.current?.value
                    })
            })
                
            if(!response.ok) {
                setError("Nie udało się zmienić danych")
                return;
            }
            setError("Pomyślnie zaktualizowano dane")
            setTimeout(() => navigate(-1), 1500);
        }
        catch {
            setError("Błąd serwera")
        }
    }

    if(loading)
        return <Loading />

    if(error)
        return <Error message={error}/>    

    return(
        <>
        <h1>edycja danych studenta</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" defaultValue={propsData.firstname} ref={firstnameRef}/> <br /><br />
            <input type="text" defaultValue={propsData.lastname} ref={lastnameRef}/> <br /><br />
            <input type="text" defaultValue={propsData.indexNum} ref={indexNumRef}/> <br /><br />
            <input type="text" defaultValue={propsData.studGroup} ref={groupRef}/> <br /><br />
            <input type="text" defaultValue={propsData.specialty} ref={specialityRef}/> <br /><br />
            <select name="" id="" ref={areaIdRef}>
                {areaData?.map(area => (
                    <option key={area.id} value={area.id}>{area.areaName}</option>
                ))}
            </select>
            <button type="submit">Potwierdź</button>
            <button type="button" onClick={() => navigate(-1)}>Anuluj</button>
        </form>
        </>
    )
}

export default EditStudentDataPage