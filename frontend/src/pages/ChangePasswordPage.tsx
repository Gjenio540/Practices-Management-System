import {useState, useRef, FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getToken, getUser } from "../modules/auth"
import { host } from "../modules/env"
import styles from "./sass/ChangePasswordPage.module.scss"
import Error from "../components/Error"

const ChangePasswordPage = () => {
    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const controllRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!getUser()) {
            navigate("/logowanie")
        }
    }, [])

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        if(passwordRef.current?.value !== controllRef.current?.value) {
            setWarning("Podane hasła są różne");
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
        setTimeout(() => navigate(-1), 2000);
    }

    if(error)
        return <Error message={error}/>

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Zmiana hasła</h1>
                {warning && <h2 className="warning">{warning}</h2>}
                <label htmlFor="pass1">Podaj hasło</label>
                <input type="password" ref={passwordRef} id="pass1" required/>
                <label htmlFor="pass2">Potwierdź hasło</label>
                <input type="password" ref={controllRef} id="pass2" required/>
                <div className={styles.options}>
                    <button type="submit" className="button bt-green">Potwierdź</button>
                    <button type="button" className="button bt-red" onClick={() => navigate(-1)}>Anuluj</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordPage
