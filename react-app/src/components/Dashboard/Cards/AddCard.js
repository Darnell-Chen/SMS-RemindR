import { useState } from 'react';
import "../../css/Dashboard/AddCard.css";

 /******** AddMember refers to the pop-up modal *********/
import AddMember from "../Modal/AddMemberModal";

function AddCard() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    /******** AddMember refers to the pop-up modal *********/
    return (
        <>
            <AddMember modalState={modal} setModal={setModal}/>
            <div onClick={toggleModal} className="Add-Card-Div">
                <p>+</p>
            </div>
        </>
    )
}

export default AddCard;