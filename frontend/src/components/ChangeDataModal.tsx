import type { modalProps } from "../modules/types";


const ChangeDataModal = (props: modalProps) => {

    if(!props.open) {
        return null;
    }

    return(
        <div>
            <button className="button bt-green">Potwierdź</button>
            <button className="button bt-red" onClick={() => props.setOpen(false)}>Anuluj</button>
        </div>
    );
}

export default ChangeDataModal
