import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from "../modules/auth";
import { host } from '../modules/env';
import styles from './sass/SignInPage.module.scss'

const SignInPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState<string>("")
    
    async function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
        try {
            e.preventDefault();
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const data = await fetch(`${host}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "username": username, 
                    "password": password
                })
            });
            if (!data.ok) {
                setError("Błędne dane logowania");
                return;
            }
            const user = await data.json();
            setUser(user);
            if(user.role === "supervisor")  {
                navigate('/'); //navigate to supervisor main page
            }
            else {
                navigate('/praktyki/me'); //navigate to student page
            }
        }
        catch {
            setError("Błąd połączenia z serwerem");
        }
    }

    return (
        <div className="container">
            <h1 className='centeredText'>System Zarządzania <br/> Praktykami Zawodowymi</h1>
            <form className={styles.loginForm} onSubmit={submit}>
                <h1 className="title">Logowanie</h1>
                {error && <h2 className="warning">{error}</h2>}
                <input type="text" ref={usernameRef} placeholder='Login' required/>
                <input type="password" ref={passwordRef} placeholder='Hasło' required/>
                <input type="submit" className="button bt-green" value={"zaloguj"}/>
            </form>
        </div>
    );
}

export default SignInPage
