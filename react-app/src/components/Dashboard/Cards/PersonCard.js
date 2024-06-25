import "../../css/Dashboard/PersonCard.css"

function PersonCard(props) {

    const deleteUser = async () => {

        const response = await fetch('http://127.0.0.1:3001/deleteMember', {
            method: 'DELETE',
            body: JSON.stringify({name: props.memberData.name}),
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("authToken") 
            }
        });

        if (response.ok) {
            console.log(response);
            const newFamily = props.familyData.filter(member => member.name !== props.memberData.name);
            props.setFamilyData(newFamily);
        } else {
            console.log("problem deleting user");
        }
    }

    return (
        <>
                <div className="row personCard">
                    <div className="col-md-10 personCard-right">
                        <h5> {"Name: " + props.memberData.name} </h5>
                        <p> {"Telephone: " + props.memberData.Phone} </p>
                        <p> {(props.memberData.numMessages == undefined) ? "Total Messages: 0" : "Total Messages: " + props.memberData.numMessages} </p>
                    </div>

                    <div className="col-md-2 personCard-left">
                        <button id="personCard-edit-button">Edit</button>
                        <button id="personCard-delete-button" onClick={deleteUser}>Delete</button>
                    </div>
                </div>

        </>
    )
}

export default PersonCard;