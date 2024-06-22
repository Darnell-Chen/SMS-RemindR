function PersonCard(props) {
    // checks if the info is null, which basically means the user hasn't added anyone yet
    // Also means useState is currently just [null] for family data
    if (props.familyData.name == null) {
        return (<></>);
    }

    console.log(props);

    return (
        <>
            <div className="Row personName">
                <h5> {"Name: " + props.familyData.name} </h5>
                <p> {"Telephone: " + props.familyData.Phone} </p>
                <p> {(props.familyData.numMessages == undefined) ? "Total Messages: 0" : "Total Messages: " + props.familyData.numMessages} </p>
            </div>
        </>
    )
}

export default PersonCard;