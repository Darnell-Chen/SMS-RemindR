import '../../css/Dashboard/Modal.css';
import ModalBody from './ModalBody';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Dashboard';

function AddMemberModal(props) {
    const navigate = useNavigate();
    const [warnings, setWarnings] = useState(null);
    
    // fetchNewData is used for both removing and adding data, hence the name
    const {fetchNewData: addData, data} = useContext(DataContext);

    const saveMember = async (e) => {
        e.preventDefault();

        if (warnings != null) {
            setWarnings(null);
        }

        // we'll store the form data here
        const object = {};

        const newForm = new FormData(e.target);
        for (let [key, value] of newForm.entries()) {
            object[key] = value;
        }

        const allMessages = data.Messages;
        for (let i = 0; i < Object.keys(allMessages).length; i++) {
            if (allMessages[i].title == object.title) {
                setWarnings("This title is already being used by another message");
                return;
            }
        }


        // basic check to see if the user has an input for any of the days of the week
        // the other input types already have a required attribute
        if ((object.freqType == "periodic") && !(object.mon || object.tue || object.wed || object.thu || object.fri || object.fri || object.sat || object.sun )){
            setWarnings("Please select atleast 1 day of the week");
            return;
        }

        // this adds a string timezone, which works 95% of the time - use a select input if you want a more accurate timezone input from user
        // https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
        object["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
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
            e.target.reset();
            addData("add", object);
            props.toggleModal();
        }

        if (addMemberResponse.status === 401) {
            navigate("/");
        }
    }

    return (
        <> 
            <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Message</h5>
                            
                            <button type="button" onClick={() => props.toggleModal()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <form onSubmit={saveMember}>

                            {/*** This is the body that contains the actual form***/}
                            <ModalBody />

                            {(warnings) ? <p className='modalWarnings'>{warnings}</p> : null}

                            <div className="modal-footer">
                                <button onClick={() => props.toggleModal()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary"> Save </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMemberModal;
