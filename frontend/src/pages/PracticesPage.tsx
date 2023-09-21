import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Error from "../components/Error"
import styles from "./sass/PracticesPage.module.scss"

const PracticesPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState();

    //sorting and filtering
    const [course, setCourse] = useState<string>("");
    const [group, setGroup] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [sort, setSort] = useState<string>("name");
    
    useEffect(() => {

    }, [])

    function showFilters(e: React.MouseEvent<HTMLButtonElement>): void {
        let left =  document.getElementById("left");
        let button = e.currentTarget;
        if(left) {
            if (left.style.display === "block") {
                left.style.display = "none";
                button.innerHTML = "pokaż filtry";
            }
            else {
                left.style.display = "block";
                button.innerHTML = "ukryj filtry";
            }
        }
    }
    

    if(loading)
        return (<Loading/>);

    if(error)
        return (<Error message="ERROR"/>);

    return (
        <div className={styles.container}>
            <button id={styles.showButton} className="button" onClick={showFilters}>pokaż filtry</button>
            <div id="left" className={styles.left}>
                <h2>Filtrowanie</h2>
                <div className={styles.options}>
                    <h3>Kierunek</h3>
                    <div className={styles.option}>
                        <input type="radio" id="course" name="course" value={""} onChange={() => setCourse("")} checked/>
                        <label htmlFor="course">Wszystkie</label>
                    </div>
                </div>
                <div className={styles.options}>
                    <h3>Grupa</h3>
                </div>
                <div className={styles.options}>
                    <h3>Status</h3>
                    <div className={styles.option}>
                        <input type="checkbox" id="zaliczona" name="status" value={"zaliczona"}/>
                        <label htmlFor="zaliczona">Zaliczona</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id="niezaliczona" name="status" value={"niezaliczona"}/>
                        <label htmlFor="niezaliczona">Niezaliczona</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id="oczekiwanie" name="status" value={"Oczekiwanie"}/>
                        <label htmlFor="oczekiwanie">Oczekiwanie</label>
                    </div>
                </div>

                <h2>Sortowanie</h2>
                <div className={styles.options}>
                    <div className={styles.option}>
                        <input type="radio" name="sort" value={"name"} onChange={() => setSort("name")} checked/>
                        <label htmlFor="status">Nazwisko</label>
                    </div>
                    <div className={styles.option}>
                        <input type="radio" name="sort" value={"niezaliczona"} onChange={() => setSort("group")}/>
                        <label htmlFor="status">Grupa</label>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.heading}>
                    <p>Imię</p>
                    <p>Nazwisko</p>
                    <p>Grupa</p>
                    <p>Kierunek</p>
                    <p>Status</p>
                </div>
                <div className={styles.items}>
                    <Link className={styles.item} to={"/praktyki/1"}>
                        <p>Jan</p>
                        <p>Nowak</p>
                        <p>32INF-PSI-SP</p>
                        <p>Informatyka</p>
                        <p>Zaliczona</p>
                    </Link>
                    <Link className={styles.item} to={"/praktyki/2"}>
                        <p>Jan</p>
                        <p>Nowak</p>
                        <p>32INF-PSI-SP</p>
                        <p>Informatyka</p>
                        <p>Zaliczona</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default PracticesPage
