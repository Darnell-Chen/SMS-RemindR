import React from 'react';

function Login(props) {
    return (
        <>
            <h2>Login</h2>
            <form className="loginForm" onSubmit={(e, props) => onLogin}>
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

export default Login;