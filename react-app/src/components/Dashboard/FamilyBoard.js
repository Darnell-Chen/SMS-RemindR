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
            console.log("my messages count: " + cardCount);
            console.log(myData.Messages)
        }
    }, [props.cardData]); // React to changes in props.cardData


    return (
        <>
            <div className="UserCard-Container-Div">

                <div className="UserCard-Container-Div2 col">
                    {familyData.map((member) => <MessageCard setFamilyData={setFamilyData} familyData={familyData} key={member.name} memberData={member}/>)}
                    {(cardCount < 20) ? <AddCard setFamilyData={setFamilyData} familyData={familyData}/> : <></>}
                </div>

            </div>
        </>
    )
}

export default FamilyBoard;