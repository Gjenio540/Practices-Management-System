import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Error from "../components/Error"
import { host } from "../modules/env"
import { getToken } from "../modules/auth"
import styles from "./sass/PracticesPage.module.scss"
import { previewData } from "../modules/interfaces"

const PracticesPage = () => {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<previewData[]>([]);

    //sorting and filtering
    const [course, setCourse] = useState<string>();
    const [group, setGroup] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [sort, setSort] = useState<string>("name");

    useEffect(() => {
        async function getPracticesData(): Promise<void> {
            const data = await fetch(host+"/practices/preview", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application-json',
                        'Authorization': 'Bearer '+getToken()
                    }
                }
            );
            if(!data.ok) {
                setLoading(false);
                setError(data.status+" "+data.statusText)
                return;
            }
            setData(await data.json());
            setLoading(false)

        }
        getPracticesData();
    }, [])

    function showFilters(e: React.MouseEvent<HTMLButtonElement>): void {
        let left = document.getElementById("left");
        let button = e.currentTarget;
        if (left) {
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

    if (loading)
        return (<Loading />);

    if (error)
        return (<Error message={error} />);

    return (
        <div className={styles.container}>
            <button id={styles.showButton} className="button" onClick={showFilters}>pokaż filtry</button>
            <div id="left" className={styles.left}>
                <h2 className="centeredText">Filtrowanie</h2>
                <div className={styles.options}>
                    <h3>Kierunek</h3>
                    <div className={styles.option}>
                        <input type="radio" id="course" name="course" value={""} onChange={() => setCourse("")} defaultChecked />
                        <label htmlFor="course">Wszystkie</label>
                    </div>
                </div>
                <div className={styles.options}>
                    <h3>Grupa</h3>
                </div>
                <div className={styles.options}>
                    <h3>Status</h3>
                    <div className={styles.option}>
                        <input type="checkbox" id="zaliczona" name="status" value={"zaliczona"} />
                        <label htmlFor="zaliczona">Zaliczona</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id="niezaliczona" name="status" value={"niezaliczona"} />
                        <label htmlFor="niezaliczona">Niezaliczona</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id="oczekiwanie" name="status" value={"Oczekiwanie"} />
                        <label htmlFor="oczekiwanie">Oczekiwanie</label>
                    </div>
                </div>

                <h2 className="centeredText">Sortowanie</h2>
                <div className={styles.options}>
                    <div className={styles.option}>
                        <input type="radio" name="sort" value={"name"} onClick={() => setSort("name")} defaultChecked />
                        <label htmlFor="status">Nazwisko</label>
                    </div>
                    <div className={styles.option}>
                        <input type="radio" name="sort" value={"niezaliczona"} onClick={() => setSort("group")} />
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
                    {data?.filter((a) => 
                        a.areaName !== ""
                    ).sort((a, b) => {
                        switch(sort) {
                            case "name": {
                                if(a.lastname > b.lastname) return 1;
                                if(a.lastname < b.lastname) return -1;
                                return 0;
                            }
                            case "group": {
                                if(a.studGroup > b.studGroup) return 1;
                                if(a.studGroup < b.studGroup) return -1;
                                return 0;
                            }
                            case "status": {
                                if(a.statusName > b.statusName) return 1;
                                if(a.statusName < b.statusName) return -1;
                                return 0;
                            }
                        }
                    }).map(data => (
                        <Link className={styles.item} to={"/praktyki/"+data.id} key={data.firstname}>
                            <p>{data.firstname}</p>
                            <p>{data.lastname}</p>
                            <p>{data.studGroup}</p>
                            <p>{data.areaName}</p>
                            <p>{data.statusName}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PracticesPage
