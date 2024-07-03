import "../../css/Dashboard/MessageCard.css";
import "../Dashboard";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Dashboard";

function MessageCard(props) {
    const navigate = useNavigate();

    // this context stores a callback function that updates based on the parameters
    // check Dashboard.js to see what parameters to use
    const {fetchNewData: deleteFunc} = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);
    const [expired, setExpired] = useState(false);

    const data = props.memberData;

    useEffect(() => {
        if (props.memberData.freqType == 'once') {
            const currDate = Date.now();
            const messageDate = new Date(props.memberData.datetime);
    
            const timeDiff = messageDate - currDate;
    
            if (timeDiff < 0) {
                setExpired(true);
            } else {
                setTimeout(() => {setExpired(true)}, timeDiff);
            }
        }
    }, [props.memberData]);

    // concatenating the days of the week to display
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let memberDays = "";
    if (props.memberData.freqType == 'periodic') {
        for (let i = 0; i < daysOfWeek.length; i++) {
            if (data[daysOfWeek[i]]) {
                if (memberDays == "") {
                    memberDays += daysOfWeek[i];
                } else {
                    memberDays = memberDays + " " + daysOfWeek[i];
                }
            }
        }
    }


    // simple delete function to delete the card from mongodb
    const deleteCard = async () => {

        const response = await fetch('http://127.0.0.1:3001/deleteMember', {
            method: 'DELETE',
            body: JSON.stringify({title: props.memberData.title}),
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("authToken") 
            }
        });

        if (response.ok) {
            deleteFunc("remove", props.memberData.title);

        } else if (response.status === 401) {
            navigate("/");
        }
    }

    return (
        <>
                <div className="row personCard">
                    <div className="col-md-10 personCard-right">
                        <h5>{"Title: " + data.title} {(expired) ? <span className="personCard-Expired"> {" [ message expired ]"} </span> : null}</h5>
                        <p> {"Recipient: " + data.name} </p>
                        {data.phone ? <p>{"Telephone Number: " + data.phone}</p>: null}
                        {data.email ? <p>{"Email: " + data.email}</p>: null}
                        {data.discord ? <p>{"Discord UID: " + data.discord}</p>: null}


                        {(expanded) ? <>
                            <br></br>
                            <h6>Details:</h6>
                            <p> {"Message: " + data.message} </p>
                            <p> {"Frequency: " + data.freqType} </p>
                            <p> {(data.freqType == "periodic") ? "Scheduled Time: " + data.time :"Scheduled DateTime: " + data.datetime} </p>
                            <p> {(data.freqType == "periodic") ? "Day(s) Scheduled: " + memberDays : null} </p>
                        </>: null}
                    </div>

                    <div className="col-md-2 personCard-left">
                        <button id="personCard-expand-button" onClick={() => {setExpanded(!expanded)}}>Expand</button>
                        <button id="personCard-delete-button" onClick={deleteCard}>Delete</button>
                    </div>
                </div>

        </>
    )
}

export default MessageCard;