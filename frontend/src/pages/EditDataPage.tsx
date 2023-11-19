import { useLocation, useNavigate } from "react-router-dom"
import { FormEvent } from "react"
import styles from "./sass/EditDataPage.module.scss"

const EditData = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
    }

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.flex}>
                        <div className={styles.data}>
                            <h1>Dane Studenta</h1>
                            <label htmlFor="firstname">Imię</label>
                            <input type="text" id="firstname" defaultValue={state.firstname}/>
                            <label htmlFor="lastname">Nazwisko</label>
                            <input type="text" id="lastname" defaultValue={state.lastname}/>
                            <label htmlFor="indexNumber">Numer indeksu</label>
                            <input type="text" id="lastname" defaultValue={state.indexNum}/>
                            <label htmlFor="group">Grupa</label>
                            <input type="text" id="group" defaultValue={state.studGroup}/>
                        </div>
                        <div className={styles.data}>
                            <h1>Dane Praktyki</h1>
                            <label htmlFor="">Nazwa firmy</label>
                            <input type="text" defaultValue={state.companyName}/>
                            <label htmlFor="">Adres firmy</label>
                            <input type="text" defaultValue={state.companyAdress}/>
                            <label htmlFor="">NIP</label>
                            <input type="text" defaultValue={state.nip}/>
                            <label htmlFor="">REGON</label>
                            <input type="text" defaultValue={state.regon}/>
                            <label htmlFor="">Data rozpoczęcia praktyki</label>
                            <input type="date" defaultValue={state.startDate}/>
                            <label htmlFor="">Data zakończenia praktyki</label>
                            <input type="date" defaultValue={state.endDate}/>
                            <label htmlFor="">Wymiar praktyki (godziny)</label>
                            <input type="text" defaultValue={state.numOfHours}/>
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

export default EditData