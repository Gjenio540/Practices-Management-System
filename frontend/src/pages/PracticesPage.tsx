import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import Error from "../components/Error"

const PracticesPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState();

    //sorting and filtering
    const [, ] = useState<string>("");
    const [, ] = useState<string>("");
    const [, ] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    


    if(loading)
        return (<Loading/>)

    if(error)
        return (<Error message="ERROR"/>)    

    return(
        <div className="container">
            <div className="left">
                <h2>Filtrowanie</h2>
                <div className="options">
                    <h3>Kierunek</h3>
                </div>
                <div className="options">
                    <h3>Grupa</h3>
                </div>
                <div className="options">
                    <h3>Status</h3>
                    <input type="radio" name="status" value={"zaliczona"}/>
                    <input type="radio" name="status" value={"niezaliczona"}/>
                    <input type="radio" name="status" value={"Oczekiwanie"}/>
                </div>

                <h2>Sortowanie</h2>
                <div className="options">
                    <input type="radio" name="status" value={"name"} onChange={() => setSort("name")}/>
                    <input type="radio" name="status" value={"niezaliczona"} onChange={() => setSort("group")}/>
                    <input type="radio" name="status" value={"Oczekiwanie"} onChange={() => setSort("status")}/>
                </div>
            </div>
            <div className="right">
                <div className="heading">
                    <p>Imię</p>
                    <p>Nazwisko</p>
                    <p>Grupa</p>
                    <p>Kierunek</p>
                    <p>Status</p>
                </div>
            </div>
        </div>
    );

}

export default PracticesPage