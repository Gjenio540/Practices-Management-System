import { FormEvent, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getToken, getRole, getUser } from "../modules/auth";
import { host } from "../modules/env";
import Error from "../components/Error";
import styles from "./sass/EditDataPage.module.scss"

const AddPracticePage = () => {
    const [error, setError] = useState<string>("")
    const data = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if(!getUser()) {
            navigate("/logowanie")
        }
        else if (getRole() !== "supervisor") {
            navigate("/praktyki/me")
        }
    }, [])

    const companyNameRef = useRef<HTMLInputElement>(null);
    const companyAddressRef = useRef<HTMLInputElement>(null);
    const nipRef = useRef<HTMLInputElement>(null);
    const regonRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const semesterRef = useRef<HTMLInputElement>(null);
    const startRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLInputElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if(startRef.current?.value && endRef.current?.value)
        {
            let rawDate = new Date(startRef.current.value)
            const startDate = rawDate.toISOString();
            rawDate = new Date(endRef.current.value)
            const endDate = rawDate.toISOString();

            const result = await fetch(host+"/practices", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+getToken()
                },
                body: JSON.stringify({
                        "studentId": data.id, 
                        "companyName": companyNameRef.current?.value,
                        "companyAddress": companyAddressRef.current?.value,
                        "nip": nipRef.current?.value,
                        "regon": regonRef.current?.value,
                        "typeOfpractice": typeRef.current?.value,
                        "semesterNumber": semesterRef.current?.value,
                        "startDate": startDate,
                        "endDate": endDate,
                        "numOfHours": hoursRef.current?.value
                    })
            })

            if(result.ok) {
                setError("Dodano praktyke");
                setInterval(() => setError(""), 1500);
            }
        }
    }

    if(error)
        return(<Error message={error}/>)

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.flex}>
                        <div className={styles.data}>
                            <h1>Dodaj praktyke do {data.firstname + " " + data.lastname}</h1>
                            <label htmlFor="">Nazwa zakładu pracy</label>
                            <input type="text" ref={companyNameRef}/>
                            <label htmlFor="">Adres zakładu pracy</label>
                            <input type="text" ref={companyAddressRef}/>
                            <label htmlFor="">NIP</label>
                            <input type="text" ref={nipRef}/>
                            <label htmlFor="">REGON</label>
                            <input type="text"  ref={regonRef}/>
                            <label htmlFor="">Rodzaj praktyki</label>
                            <input type="text" ref={typeRef}/>
                            <label htmlFor="">Numer semestru</label>
                            <input type="text" ref={semesterRef}/>
                            <label htmlFor="">Data rozpoczęcia praktyki</label>
                            <input type="date" ref={startRef}/>
                            <label htmlFor="">Data zakończenia praktyki</label>
                            <input type="date" ref={endRef}/>
                            <label htmlFor="">Wymiar praktyki (godziny)</label>
                            <input type="number"  defaultValue={160} ref={hoursRef}/>
                            <div className={styles.options}>
                                <button className="button bt-green" type="submit">Dodaj praktyke</button>
                                <button className="button bt-red" type="button" onClick={() => navigate(-1)}>Anuluj</button>
                            </div>
                        </div>  
                    </div>   
                </form>
            </div>  
        </div>        
    )
}

export default AddPracticePage