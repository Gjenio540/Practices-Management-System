import { modalProps } from "../modules/interfaces";
import styles from "./sass/ChangeStatusModal.module.scss"

const ChangeDataModal = (props: modalProps) => {

    if(!props.open) {
        return null;
    }

    console.log(props)

    async function handleSubmit(): Promise<void> {
        
    }

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={props.data?.firstname}/>   
                </form>
                <div className={styles.options}>
                    <button className="button bt-green">Potwierdź</button>
                    <button className="button bt-red" onClick={() => props.setOpen(false)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeDataModal
