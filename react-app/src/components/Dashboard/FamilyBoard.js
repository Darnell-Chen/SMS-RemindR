import AddCard from "./Cards/AddCard";
import EmptyCard from "./Cards/EmptyCard";
import PersonCard from "./Cards/PersonCard";
import { useState } from "react";

function FamilyBoard(props) {
    const [cardCount, setCardCount] = useState(props.cardData.familyCount);

    console.log(props.cardData.familyCount);

    return (
        <>
            <div className="UserCard-Container-Div">

                <div className="col">
                    {(cardCount < 10) ? <AddCard /> : <EmptyCard/>}
                </div>

            </div>
        </>
    )
}

export default FamilyBoard;