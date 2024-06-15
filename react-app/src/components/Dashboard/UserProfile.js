import '../css/Dashboard.css';

function userProfile(props) {

    const logoutSequence = () => {
        console.log("logout clicked");
        localStorage.clear();
        props.cardNav("/");
    }

    return (
        <>
            <div className='User-Profile-Div'>
                <div className="row">
                    <h1>Hi <span className="Profile-Name">Darnell,</span></h1>

                    <h2>Welcome to SMS-RemindR</h2>
                    <h4> Telephone: 803-XXX-XXXX </h4>
                    <h4> Email: fakeEmail@gmail.com </h4>

                    <h4> You currently have: </h4>
                    <h5> 5 Family Members</h5>
                    <h6> 1 daily SMS </h6>
                </div>

                <div className="row">
                    <button onClick={logoutSequence}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default userProfile;