import type { modalProps } from "../modules/types";
import styles from './sass/ChangeStatusModal.module.scss';

const ChangeStatusModal = (props: modalProps) => {

    if(!props.open) {
        return null;
    }

    return(
        <div className={styles.content}>
            <div className={styles.container}>
                <h1>Zmień status na:</h1>
                <select>
                    <option value="">Zaliczona</option>
                    <option value="">Niezaliczona</option>
                    <option value="">OPTION 3</option>
                    <option value="">OPTION 4</option>
                </select>
                <div className={styles.options}>
                    <button className="button bt-green">Potwierdź</button>
                    <button className="button bt-red" onClick={() => props.setOpen(false)}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeStatusModal
