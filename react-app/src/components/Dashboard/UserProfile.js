function UserProfile(props) {

    const logoutSequence = () => {
        console.log("logout clicked");
        localStorage.clear();
        props.cardNav("/");
    }

    const userInfo = props.cardData;

    return (
        <>
            <div className='User-Profile-Div'>
                <div className="row">
                    <h1>Hi <span className="Profile-Name">{props.cardData.first_name + "!"}</span></h1>

                    <h2>Welcome to SMS-RemindR</h2>
                    
                    <h4> Telephone: {props.cardData.telephone} </h4>
                    <h4> Email: {props.cardData.username} </h4>

                    <h4> You currently have: </h4>
                    <h5> {props.cardData.familyCount} Family Members</h5>
                </div>

                <div className="row">
                    <button onClick={logoutSequence}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile;