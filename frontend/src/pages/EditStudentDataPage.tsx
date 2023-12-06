import { useState, useEffect, useRef, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getToken } from "../modules/auth";
import { host } from "../modules/env";
import { areaData } from "../modules/interfaces";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "./sass/EditDataPage.module.scss"

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
        <div className={styles.content}>
            <div className={styles.container}></div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.flex}>
                        <div className={styles.data}>
                            <h1>edycja danych studenta</h1>
                            <label htmlFor="firstname">imie</label>
                            <input type="text" id="firstname" defaultValue={propsData.firstname} ref={firstnameRef}/>
                            <label htmlFor="lastname">nazwisko</label>
                            <input type="text" id="lastname" defaultValue={propsData.lastname} ref={lastnameRef}/>
                            <label htmlFor="indexNum">numer indeksu</label>
                            <input type="text" id="indexNum" defaultValue={propsData.indexNum} ref={indexNumRef}/>
                            <label htmlFor="studGroup">grupa</label>
                            <input type="text" id="studGroup" defaultValue={propsData.studGroup} ref={groupRef}/>
                            <label htmlFor="specialty">specjalność</label>
                            <input type="text" id="specialty" defaultValue={propsData.specialty} ref={specialityRef}/>
                            <label htmlFor="area">kierunek</label>
                            <select name="" id="area" ref={areaIdRef}>
                                {areaData?.map(area => (
                                    <option key={area.id} value={area.id}>{area.areaName}</option>
                                ))}
                            </select>
                            <div className={styles.options}>
                                <button type="submit" className="button bt-green">Potwierdź</button>
                                <button type="button" className="button bt-red" onClick={() => navigate(-1)}>Anuluj</button>
                            </div>
                        </div>
                    </div>
                </form>
            <div/>
        </div>
    )
}

export default EditStudentDataPage