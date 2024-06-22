import "../../css/Dashboard/Modal.css"

function ModalBody() {
    return(
        <>
        <div className="modal-body">
            <div className="Person-Name-Div">
                <input name="name" maxLength="20" placeholder="Full Name" type="text"/>
            </div>

            <input name="Phone" placeholder="Phone" type="tel" max={10}/>
        </div>
        </>
    )
}

export default ModalBody;