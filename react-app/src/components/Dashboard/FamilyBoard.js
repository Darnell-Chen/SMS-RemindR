import AddCard from "./Cards/AddCard";
import MessageCard from "./Cards/MessageCard";
import { useState, useEffect } from "react";

function FamilyBoard(props) {
    const [cardCount, setCardCount] = useState(0);
    const [familyData, setFamilyData] = useState([]);

    const myData = props.cardData;

    useEffect(() => {
        if (myData) {
            setCardCount(myData.messageCount);
            setFamilyData(myData.Messages);
        }
    }, [props.cardData]); // React to changes in props.cardData


    return (
        <>
            <div className="UserCard-Container-Div">

                <div className="UserCard-Container-Div2 col">
                    {familyData.map((message) => <MessageCard familyData={familyData} key={message.message} memberData={message}/>)}
                    {(cardCount < 20) ? <AddCard familyData={familyData}/> : <></>}
                </div>

            </div>
        </>
    )
}

export default FamilyBoard;