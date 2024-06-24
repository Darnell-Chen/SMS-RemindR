import "../../css/Dashboard/Modal.css"
import AddMessage from './AddMessage';
import { useState } from "react";

function SecondModalBody() {
    const [currMessages, setCurrMessages] = useState([]);

    return(
        <>
            <div className="modal-body-second">
                {currMessages.map((message) => <AddMessage myMessage={member}/>)}
                {/* <AddMessage /> */}
            </div>
        </>
    )
}

export default SecondModalBody;