function AddMemberModal(props) {

    return (
        <>
            <div className="modal" tabIndex="-1" style={props.modalState ? { display:'block'} : {display : 'none'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Person</h5>
                        <button type="button" onClick={() => props.setModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>



                    <div className="modal-body">
                        <form>
                            <div className="Person-Name-Div">
                                <input name="fname" maxLength="20" placeholder="First Name" type="text"/>
                                <input name="lname" maxLength="20" placeholder="Last Name" type="text"/>
                            </div>

                            <input name="telephone" placeholder="telephone" type="text"/>
                        </form>
                    </div>



                    <div className="modal-footer">
                        <button onClick={() => props.setModal(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Add</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddMemberModal;