import AddCard from "./Cards/AddCard";
import PersonCard from "./Cards/PersonCard";
import { useState, useEffect } from "react";

function FamilyBoard(props) {
    const [cardCount, setCardCount] = useState(0);
    const [familyData, setFamilyData] = useState([{name: null}]);

    const myData = props.cardData;

    useEffect(() => {
        if (myData) {
            setCardCount(myData.familyCount);
            setFamilyData(myData.Family);
            console.log("my family count: " + cardCount);
        }
    }, [props.cardData]); // React to changes in props.cardData


    return (
        <>
            <div className="UserCard-Container-Div">

                <div className="col">
                    {familyData.map((member) => <PersonCard key={member.name} familyData={member}/>)}
                    {(cardCount && cardCount < 10) ? <AddCard /> : <></>}
                </div>

            </div>
        </>
    )
}

export default FamilyBoard;