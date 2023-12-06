import { FormEvent, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getToken } from "../modules/auth";
import { host } from "../modules/env";

const AddPracticePage = () => {
    const data = useLocation().state;
    const navigate = useNavigate();

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
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Nazwa zakładu pracy</label> <br />
            <input type="text" ref={companyNameRef}/><br /><br />
            <label htmlFor="">Adres zakładu pracy</label><br />
            <input type="text" ref={companyAddressRef}/><br /><br />
            <label htmlFor="">NIP</label><br />
            <input type="text" ref={nipRef}/><br /><br />
            <label htmlFor="">REGON</label><br />
            <input type="text"  ref={regonRef}/><br /><br />
            <label htmlFor="">Rodzaj praktyki</label><br />
            <input type="text" ref={typeRef}/><br /><br />
            <label htmlFor="">Numer semestru</label><br />
            <input type="text" ref={semesterRef}/><br /><br />
            <label htmlFor="">Data rozpoczęcia praktyki</label><br />
            <input type="date" ref={startRef}/><br /><br />
            <label htmlFor="">Data zakończenia praktyki</label><br />
            <input type="date" ref={endRef}/><br /><br />
            <label htmlFor="">Wymiar praktyki (godziny)</label><br />
            <input type="number"  defaultValue={160} ref={hoursRef}/><br /><br />
            <button className="button bt-green" type="submit">Dodaj praktyke</button>
            <button className="button bt-red" type="button" onClick={() => navigate(-1)}>Anuluj</button>
        </form>
    )
}

export default AddPracticePage