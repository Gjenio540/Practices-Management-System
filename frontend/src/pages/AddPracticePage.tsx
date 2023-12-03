import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const AddPracticePage = () => {
    const data = useLocation().state;
    const navigate = useNavigate();

    async function handleSubmit(): Promise<void> {
        
    }


    return(
        <form action="">
            <label htmlFor="">Nazwa zakładu pracy</label> <br />
            <input type="text" /><br /><br />
            <label htmlFor="">Adres zakładu pracy</label><br />
            <input type="text" /><br /><br />
            <label htmlFor="">NIP</label><br />
            <input type="text" /><br /><br />
            <label htmlFor="">REGON</label><br />
            <input type="text" /><br /><br />
            <label htmlFor="">Rodzaj praktyki</label><br />
            <input type="text" /><br /><br />
            <label htmlFor="">Numer semestru</label><br />
            <input type="text" /><br /><br />
            <label htmlFor="">Data rozpoczęcia praktyki</label><br />
            <input type="date" /><br /><br />
            <label htmlFor="">Data zakończenia praktyki</label><br />
            <input type="date" /><br /><br />
            <label htmlFor="">Wymiar praktyki (godziny)</label><br />
            <input type="number"  defaultValue={160}/><br /><br />
            <button className="button bt-green" type="submit">Dodaj praktyke</button>
            <button className="button bt-red" type="button" onClick={() => navigate(-1)}>Anuluj</button>
        </form>
    )
}

export default AddPracticePage