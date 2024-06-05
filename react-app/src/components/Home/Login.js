import React from 'react';

function Login() {
    return (
        <>
            <h2>Login</h2>
            <form className="loginForm">
                <input placeholder="Email" type="text"/>
                <input placeholder="Password" type="text"/>

                <div className="login-options-div">
                    <button className="loginOptions">Forgot Password</button>
                    <button className="loginOptions">Register Here</button>

                    <button className="loginButton">Let's Go</button>
                </div>
            </form>
        </>
    )
}

export default Login;