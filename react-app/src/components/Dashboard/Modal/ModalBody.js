import "../../css/Dashboard/Modal.css"

function ModalBody() {
    const saveMember = (e) => {
        console.log("submitted form");
        console.log(e.target);
        const newForm = new FormData(e.target);
        console.log(newForm);
    }

    return(
        <>
        <div className="modal-body">
            <div className="Person-Name-Div">
                <input name="fname" maxLength="20" placeholder="First Name" type="text"/>
                <input name="lname" maxLength="20" placeholder="Last Name" type="text"/>
            </div>

            <input name="Phone" placeholder="Phone" type="tel" max={10}/>
        </div>
        </>
    )
}

export default ModalBody;