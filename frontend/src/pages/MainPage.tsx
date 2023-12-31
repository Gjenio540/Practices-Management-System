import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getRole, getUser } from "../modules/auth"


const MainPage = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        if(!getUser()) {
            navigate("/logowanie")
        }
        else if (getRole() !== "supervisor") {
            navigate("/praktyki/me")
        }
    }, [])

    return(
        <div className="container">
            <div className="flex">
                <Link className="tile" to={"/studenci"}>Studenci</Link>
                <Link className="tile" to={"/praktyki"}>Praktyki</Link>
            </div>
        </div>
    )
}

export default MainPage
