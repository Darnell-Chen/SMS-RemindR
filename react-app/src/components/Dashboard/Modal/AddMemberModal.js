import '../../css/Dashboard/Modal.css';
import FirstModalBody from './FirstModalBody';

import {useState} from 'react';
import SecondModalBody from './SecondModalBody';

function AddMemberModal(props) {
    // this will decide whether we're on first modal - which adds member - or seconds modal, which adds its messages
    const [modalState, setModalState] = useState('firstModal');

    const saveMember = async (e) => {
        e.preventDefault();

        // we'll store the form data here
        const object = {};

        const newForm = new FormData(e.target);
        for (let [key, value] of newForm.entries()) {
            object[key] = value;
        }
        
        const addMemberResponse = await fetch('http://127.0.0.1:3001/addMember', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        })

        if (addMemberResponse.ok) {
            setModalState("secondModal");
        }
    }

    return (
        <> 
            <div className="modal" tabIndex="-1" style={props.modalState ? { display:'block'} : {display : 'none'}}>

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalState === "secondModal" ? "Add Messages" : "Add New Recipient"}</h5>
                            
                            <button type="button" onClick={() => props.setModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <form onSubmit={saveMember}>

                            {/*** This is the body that contains the actual form***/}
                            {modalState === "secondModal" ? <SecondModalBody /> : <FirstModalBody />}

                            <div className="modal-footer">
                                <button onClick={() => props.setModal(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary"> {modalState === "secondModal" ? "Save" : "Next"} </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMemberModal;
