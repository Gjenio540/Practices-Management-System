import { useNavigate } from 'react-router-dom';
import uz_logo from '../assets/uz_logo.svg'


const Header = () => {
    
    const navigate = useNavigate();

    function logOut(): void {
        window.sessionStorage.removeItem('user');
        navigate('/logowanie');
    }

    return(
        <header>
            <img src={uz_logo} alt="uz_logo" width={"96px"} height={"72px"}/>
            <div></div>
            <button onClick={() => logOut()}>Wyloguj</button>
        </header>
    );
}

export default Header
