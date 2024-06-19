import { useState } from 'react';
import AddMember from "./AddMemberModal";

function AddCard() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        console.log(modal);
        setModal(!modal);
    }

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