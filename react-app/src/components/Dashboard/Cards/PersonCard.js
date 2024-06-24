import "../../css/Dashboard/PersonCard.css"

function PersonCard(props) {

    return (
        <>
                <div className="row personCard">
                    <div className="col-md-10 personCard-right">
                        <h5> {"Name: " + props.familyData.name} </h5>
                        <p> {"Telephone: " + props.familyData.Phone} </p>
                        <p> {(props.familyData.numMessages == undefined) ? "Total Messages: 0" : "Total Messages: " + props.familyData.numMessages} </p>
                    </div>

                    <div className="col-md-2 personCard-left">
                        <button id="personCard-edit-button">Edit</button>
                        <button id="personCard-delete-button">Delete</button>
                    </div>
                </div>

        </>
    )
}

export default PersonCard;