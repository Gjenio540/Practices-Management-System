import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getRole } from "../modules/auth"

const MainPage = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        if (getRole() !== "supervisor") {
           
            navigate("/praktyki/me")
        }
    }, [])

    return(
        <>
        <h1>Main Page 🖥️</h1>
        <Link to={"/praktyki"}>Praktyki</Link><br /><br />
        <Link to={"/studenci"}>Studenci</Link>
        </>
    )
}

export default MainPage
