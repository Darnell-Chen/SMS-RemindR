import { useRef, useState } from 'react';

function AddMessage(props) {
    // useRef differs from useState in that we don't need to re-render if this changes
    const message = useRef("");

    // this will decide whether or not we should display the "add" or "delete" button
    const [msgAdded, setMsgAdded] = useState(true);

    const nextMsg = () => {
        console.log(message.current);
        props.setCurrMessages(props.currMessages)
    };

    const deleteMsg = () => {
        console.log(message.current);
    };

    return (
        <>
            <textarea 
                name="message"
                type="text"
                placeholder="Your Message" 
                onChange={(e) => {message.current = e.target.value}} 
            />
            <input name="time" type="time" />

            {msgAdded ? <button className='addMsg' type="button" onClick={nextMsg}>Add</button> : <button className="deleteMsg" type="button" onClick={deleteMsg}>Delete</button> }
            {msgAdded ? <div className='divider'></div> : <></>}
        </>
    );
}

export default AddMessage;
