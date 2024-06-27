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
            <input name="name" maxLength="20" placeholder="Full Name" type="text" required/>

            <input name="name" maxLength="50" placeholder="Message Description" type="text" required/>

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

            {(contactType === "phone") ? <input name="phone" placeholder="Phone" type="tele" max={10} required/> : null}
            {(contactType === "email") ? <input name="email" placeholder="Email" type="email" max={25} required/> : null}
            {(contactType === "discord") ? <input name="discord" placeholder="Discord Username" type="text" max={20} required/> : null}


            <textarea name="message" maxLength="150" type="text" placeholder="Your Message <150 characters" required/>

            <label className="radioHeading">Select how frequently the message should be sent: </label>
            <div className="frequencyDiv">
                <div>
                    <input type="radio" checked={freqType==="periodic" ? "true" : null} onClick={() => {changeFreqType("periodic")}} name="freqType" value="periodic" required/>
                    <label>&nbsp; Periodic</label>
                </div>

                <div>
                    <input type="radio" checked={freqType==="once" ? "true" : null} onClick={() => {changeFreqType("once")}} name="freqType" value="once" required/>
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