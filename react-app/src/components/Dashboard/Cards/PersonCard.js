import "../../css/Dashboard/PersonCard.css"

function PersonCard(props) {
    // checks if the info is null, which basically means the user hasn't added anyone yet
    // Also means useState is currently just [null] for family data
    if (props.familyData.name == null) {
        return (<></>);
    }

    console.log(props);

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