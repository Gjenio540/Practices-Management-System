import { useNavigate, useLocation } from 'react-router-dom';
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
            <img src={uz_logo} alt="uz_logo" width={"96px"} height={"72px"}/>
            <div></div>
            <button className="button bt-red" onClick={logOut}>Wyloguj</button>
        </header>
    );
}

export default Header
