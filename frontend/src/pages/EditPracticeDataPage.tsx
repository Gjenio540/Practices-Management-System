import { useLocation, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState, useEffect } from "react"
import { host } from "../modules/env"
import { getToken, getUser, getRole } from "../modules/auth"
import styles from "./sass/EditDataPage.module.scss"
import { practiceData } from "../modules/interfaces"
import Error from "../components/Error"

const EditPracticeData = () => {
    const propsData: practiceData = useLocation().state;
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

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

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if(startRef.current?.value && endRef.current?.value)
        {
            let rawDate = new Date(startRef.current.value)
            const startDate = rawDate.toISOString();
            rawDate = new Date(endRef.current.value)
            const endDate = rawDate.toISOString();

            const result = await fetch(host+"/practices/"+propsData.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+getToken()
                },
                body: JSON.stringify({
                        "studentId": propsData.id, 
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

            if(!result.ok) {
                setError("Wystąpił błąd");
                setTimeout(() => setError(""), 1500);
                return
            }

            setError("Pomyślnie edytowano dane praktyki");
            setTimeout(() => navigate(-1), 1500);
            return
        }
    }

    const startDate = new Date(propsData.startDate).toLocaleDateString("sv")
    const endDate = new Date(propsData.endDate).toLocaleDateString("sv")

    if(error) 
        return <Error message={error}/>

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.flex}>
                        <div className={styles.data}>
                            <h1>Edycja danych praktyki</h1>
                            <label htmlFor="companyName">Nazwa firmy</label>
                            <input type="text" id="companyName" defaultValue={propsData.companyName} ref={companyNameRef}/>
                            <label htmlFor="companyAdress">Adres firmy</label>
                            <input type="text" id="companyAdress" defaultValue={propsData.companyAddress} ref={companyAddressRef}/>
                            <label htmlFor="nip">NIP</label>
                            <input type="text" id="nip" defaultValue={propsData.nip} ref={nipRef}/>
                            <label htmlFor="regon">REGON</label>
                            <input type="text" id="regon" defaultValue={propsData.regon} ref={regonRef}/>
                            <label htmlFor="type">Rodzaj praktyki</label>
                            <input type="text" id="type" defaultValue={propsData.typeOfpractice} ref={typeRef}/>
                            <label htmlFor="start">Data rozpoczęcia praktyki</label>
                            <input type="date" id="start" defaultValue={startDate} ref={startRef}/>
                            <label htmlFor="end">Data zakończenia praktyki</label>
                            <input type="date" id="end" defaultValue={endDate} ref={endRef}/>
                            <label htmlFor="hours">Wymiar praktyki (godziny)</label>
                            <input type="text" id="hours" defaultValue={propsData.numOfHours} ref={hoursRef}/>
                        </div>
                    </div>
                    <div className={styles.options}>
                        <button type="submit" className="button bt-green">Potwierdź</button>
                        <button type="button" className="button bt-red" onClick={() => navigate(-1)}>Anuluj</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPracticeData