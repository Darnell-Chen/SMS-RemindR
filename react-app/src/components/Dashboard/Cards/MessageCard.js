import "../../css/Dashboard/MessageCard.css";
import "../Dashboard";
import { useContext } from "react";
import { DataContext } from "../Dashboard";

function MessageCard(props) {
    // this context stores a callback function that updates based on the parameters
    // check Dashboard.js to see what parameters to use
    const deleteFunc = useContext(DataContext);

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

        } else {
            console.log("problem deleting user");
        }
    }
    return (
        <>
                <div className="row personCard">
                    <div className="col-md-10 personCard-right">
                        <h5>{"Title: " + props.memberData.title}</h5>
                        <p> {"Recipient: " + props.memberData.name} </p>
                        {props.memberData.phone ? <p>{"Telephone Number: " + props.memberData.phone}</p>: null}
                        {props.memberData.email ? <p>{"Email: " + props.memberData.email}</p>: null}
                        {props.memberData.discord ? <p>{"Discord Username: " + props.memberData.discord}</p>: null}
                    </div>

                    <div className="col-md-2 personCard-left">
                        <button id="personCard-edit-button">Edit</button>
                        <button id="personCard-delete-button" onClick={deleteCard}>Delete</button>
                    </div>
                </div>

        </>
    )
}

export default MessageCard;