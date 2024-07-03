import "../../css/Dashboard/Modal.css"
import {useState} from 'react';
import PeriodicForm from "./FormComponents/PeriodicForm";
import OnceForm from "./FormComponents/OnceForm";

function ModalBody() {
    const [contactType, setContactType] = useState(null);
    const [freqType, setFreqType] = useState(null);

    // the onClick function for the conditional render of input type
    const changeContactType = (newType) => {
        setContactType(newType);
    }

    const changeFreqType = (newType) => {
        setFreqType(newType);
    }


    return(
        <>
        <div className="modal-body">
            <input className="needBorder" name="title" maxLength="50" placeholder="Title [Describe Message]" type="text" required/>

            <input className="needBorder" name="name" maxLength="20" placeholder="Full Name" type="text" required/>

            {/*************** Div That Contains the Radio Boxes ****************/}
            <label className="radioHeading">Select how you want the message to be sent: </label>
            <div className="msgType">
                <div>
                    <input type="radio" name="contactType" value="phone" onClick={() => {changeContactType("phone")}} required/>
                    <label> &nbsp; Phone</label>
                </div>

                <div>
                    <input type="radio" name="contactType" value="email" onClick={() => {changeContactType("email")}} required/>
                    <label> &nbsp; Email</label>
                </div>

                <div>
                    <input type="radio" name="contactType" value="discord" onClick={() => {changeContactType("discord")}} required/>
                    <label> &nbsp;Discord</label>
                </div>
            </div>

            {(contactType === "phone") ? <input className="needBorder" name="phone" placeholder="Phone" type="text" pattern="[0-9]{10,10}" required/> : null}
            {(contactType === "email") ? <input className="needBorder" name="email" placeholder="Email" type="email" maxLength={30} required/> : null}

            {/********** Discord UID is min length 17 and max length 18 *********/}
            {(contactType === "discord") ? <input className="needBorder" name="discord" placeholder="Discord UID (NOT USERNAME)" type="text" pattern="[0-9]{17,18}" title="Note: This isn't a valid UID" required/> : null}


            <textarea className="needBorder" name="message" maxLength="150" type="text" placeholder="Your Message <150 characters" required/>

            <label className="radioHeading">Select how frequently the message should be sent: </label>
            <div className="frequencyDiv">
                <div>
                    <input className="needBorder" type="radio" checked={freqType==="periodic" ? "true" : undefined} onClick={() => {changeFreqType("periodic")}} name="freqType" value="periodic" required/>
                    <label>&nbsp; Periodic</label>
                </div>

                <div>
                    <input className="needBorder" type="radio" checked={freqType==="once" ? "true" : undefined} onClick={() => {changeFreqType("once")}} name="freqType" value="once" required/>
                    <label>&nbsp; Single-Use</label>
                </div>
            </div>


            {freqType === "periodic" ? <PeriodicForm/> : null}
            {freqType === "once" ? <OnceForm/> : null}
        </div>
        </>
    )
}

export default ModalBody;