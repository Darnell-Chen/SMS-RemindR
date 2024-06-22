import '../../css/Dashboard/Modal.css';
import ModalBody from './ModalBody';

function AddMemberModal(props) {

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
            console.log("successfully added family member");
        }
    }

    return (
        <> 
            <div className="modal" tabIndex="-1" style={props.modalState ? { display:'block'} : {display : 'none'}}>

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Person</h5>
                            <button type="button" onClick={() => props.setModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <form onSubmit={saveMember}>

                            {/*** This is the body that contains the actual form***/}
                            <ModalBody />

                            <div className="modal-footer">
                                <button onClick={() => props.setModal(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Next</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMemberModal;
