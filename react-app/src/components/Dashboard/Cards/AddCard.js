import { useState } from 'react';
import "../../css/Dashboard/AddCard.css";

 /******** AddMember refers to the pop-up modal *********/
import AddMessage from "../Modal/AddMessageModal";

function AddCard() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    /******** AddMember refers to the pop-up modal *********/
    return (
        <>
            {(modal) ? <AddMessage toggleModal={toggleModal}/> : null}
            <div onClick={toggleModal} className="Add-Card-Div">
                <p>+</p>
            </div>
        </>
    )
}

export default AddCard;