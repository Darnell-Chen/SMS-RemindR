function userProfile(props) {

    const logoutSequence = () => {
        console.log("logout clicked");
        localStorage.clear();
        props.cardNav("/");
    }

    return (
        <>
            <div className="User-Profile-Div col-4 justify-content-center">
                <div className="row">
                    <h1>Hi</h1>
                    <h2>Darnell {/***Put props name here**/}</h2>
                    <p> Telephone: 803-584-5718 </p>
                    <p> Email: fakeEmail@gmail.com </p>
                </div>

                <div className="row">
                    <button onClick={logoutSequence}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default userProfile;