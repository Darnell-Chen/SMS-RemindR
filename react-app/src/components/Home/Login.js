import React from 'react';

function Login(props) {
    return (
        <>
            <h2>Login</h2>
            <form className="loginForm" onSubmit={(e, props) => onLogin(e, props)}>
                <input placeholder="Email" type="text"/>
                <input placeholder="Password" type="text"/>

                <div className="login-options-div">
                    <div>
                        <a href="#" className="loginOptions">Forgot Password?</a>
                    </div>
                    <div>
                        <a href="#" className="loginOptions" onClick={() => {props.setForm('Registration')}}>Register Here</a>
                    </div>
                </div>

                    
                <button className="loginButton" type="submit">Login</button>
            </form>
        </>
    )
}

async function onLogin(e, props){
    // stops page from reloading automatically
    e.preventDefault();

    const currForm = new FormData(e.currentTarget);

    currForm.append('action', 'login');

    // for some reason, the formdata body isn't being recieved if I simply send the fetch request
    // as a multiform / default content-type
    const myData = new URLSearchParams(currForm).toString();

    const response = await fetch('http://127.0.0.1:3001', {
        method: 'POST',
        body: myData,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    });

    const serverResponse = await response.text();

    if (response.status === 201) {
        console.log(serverResponse);
    }
}

export default Login;