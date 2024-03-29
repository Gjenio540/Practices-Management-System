import { useNavigate, useLocation, Link } from 'react-router-dom';
import uz_logo from '../assets/uz_logo.svg'
import styles from './sass/Header.module.scss'

const Header = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    function logOut(): void {
        window.sessionStorage.removeItem('user');
        navigate('/logowanie');
    }

    if(location.pathname === "/logowanie") {
        return null;
    }
        
    return(
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={uz_logo} alt="uz_logo" width={"96px"} height={"72px"}/>
                <h1 className={styles.logoText}>System Zarządzania Praktykami</h1>
            </Link>
            <div></div>
            <div  className={styles.logo}>
                <Link to="/password">zmień hasło</Link>
                <button className="button bt-red" onClick={logOut}>Wyloguj</button>
            </div>
        </header>
    );
}

export default Header
