import { useRef } from 'react';

function AddMessage() {
    const message = useRef("");

    const nextMessage = () => {
        console.log(message.current);
    };

    return (
        <>
            <input 
                type="text" 
                placeholder="Your Message" 
                onChange={(e) => {message.current = e.target.value}} 
            />
            <input type="time" />
            <div></div>
            <button type="button" onClick={nextMessage}>Add</button>
        </>
    );
}

export default AddMessage;
