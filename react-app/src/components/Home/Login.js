import React from 'react';

function Login() {
    return (
        <>
            <h2>Login</h2>
            <form className="loginForm">
                <input placeholder="Username" type="text"/>
                <input placeholder="Password" type="text"/>

                <button className="loginOptions">Forgot Password</button>
                <button className="loginOptions">Register Here</button>

                <button className="loginButton">Let's Go</button>
            </form>
        </>
    )
}

export default Login;