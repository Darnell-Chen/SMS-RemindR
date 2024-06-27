import "../css/Dashboard/UserProfile.css"

function UserProfile(props) {

    const logoutSequence = () => {
        localStorage.clear();
        props.cardNav("/");
    }

    const userInfo = props.cardData;

    return (
        <>
            <div className='User-Profile-Div row'>
                <div className="col-md-5">
                    <h5>Welcome to SMS-RemindR</h5>
                    <h5>User: <span className="Profile-Name">{props.cardData.first_name + " " + props.cardData.last_name}</span></h5>
{/*                     
                    <h4> Telephone: {props.cardData.telephone} </h4>
                    <h4> Email: {props.cardData.username} </h4> */}
                </div>

                <div className="user-Info-Div col-md-5">

                </div>

                <div className="logoutDiv col-md-2">
                    <button className="logoutButton" onClick={logoutSequence}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile;