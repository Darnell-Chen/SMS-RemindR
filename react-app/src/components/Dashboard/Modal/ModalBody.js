function ModalBody() {
    return(
        <>
        <div className="modal-body">
            <form>
                <div className="Person-Name-Div">
                    <input name="fname" maxLength="20" placeholder="First Name" type="text"/>
                    <input name="lname" maxLength="20" placeholder="Last Name" type="text"/>
                </div>

                <input name="telephone" placeholder="telephone" type="text" value="00:00"/>
            </form>
        </div>
        </>
    )
}

export default ModalBody;