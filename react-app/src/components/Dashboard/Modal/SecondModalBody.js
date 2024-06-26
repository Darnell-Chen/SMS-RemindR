import "../../css/Dashboard/Modal.css"
import AddMessage from './MessageContainer';
import { useState } from "react";

function SecondModalBody() {
    const [currMessages, setCurrMessages] = useState([]);

    return(
        <>
            <div className="modal-body-second">
                {currMessages.map((message) => <AddMessage setCurrMessages={setCurrMessages} currMessages={currMessages} myMessage={message}/>)}
                {/* We'll do Add Message if currMessages.size() < 10 */}
                {currMessages.length < 10 ? <AddMessage/> : <></>}
            </div>
        </>
    )
}

export default SecondModalBody;