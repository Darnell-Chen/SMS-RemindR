import {useState} from 'react';

function AddMessage() {

    // I'll probably add a statement that checks if a prop exists
    // if the props exist w/ values, then we'll use that value instead
    // something like: if(props.stateExist) then useState(prop) else useState(null)
    // option 2: we store the individual persons and messages as json in local storage
    const [currMessage, setMessage] = useState(null);

    if (currMessage == null) {
        return (
            <>
                <input type="text" placeholder='Your Message'/>
                <input type="time"/>
                <div></div>
                <button>Add</button>
            </>
        )
    }
}

export default AddMessage;