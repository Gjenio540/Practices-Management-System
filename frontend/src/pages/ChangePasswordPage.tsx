import {useState, useRef, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { getToken } from "../modules/auth"
import { host } from "../modules/env"
import styles from "./sass/ChangePasswordPage.module.scss"
import Error from "../components/Error"

const ChangePasswordPage = () => {
    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const controllRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        if(passwordRef.current?.value !== controllRef.current?.value) {
            setWarning("Podane hasła są różne");
            console.error("łoka")
            return;
        }
        const response = await fetch(host+"/auth/password", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getToken()
            },
            body: JSON.stringify({
                "password": passwordRef.current?.value
            })
        });
        if(!response.ok) {
            setError("Coś poszło nie tak");
            return;
        }
        setError("Hasło zostało zmienione");
        setInterval(() => navigate(-1), 2000);
    }

    if(error)
        return <Error message={error}/>

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Zmiana hasła</h1>
            {warning && <h2 className="warning">{warning}</h2>}
            <label htmlFor="pass1">Podaj hasło</label>
            <input type="password" ref={passwordRef} id="pass1" />
            <label htmlFor="pass2">Potwierdź hasło</label>
            <input type="password" ref={controllRef} id="pass2" />
            <div className={styles.options}>
                <button type="submit" className="button bt-green">Potwierdź</button>
                <button type="button" className="button bt-red" onClick={() => navigate(-1)}>Anuluj</button>
            </div>
        </form>
    )
}

export default ChangePasswordPage