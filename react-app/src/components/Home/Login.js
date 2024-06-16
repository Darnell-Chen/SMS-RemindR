import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        const currForm = new FormData(e.currentTarget);

        // for some reason, the formdata body isn't being recieved if I simply send the fetch request
        // as a multiform / default content-type
        const myData = new URLSearchParams(currForm).toString();

        const response = await fetch('http://127.0.0.1:3001/login', {
            method: 'POST',
            body: myData,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.status === 201) {
            const tokens = await response.json();
            
            const { authToken, refreshToken } = tokens;

            // generally, it's advised to store refreshToken in http-only cookie, but this is just for a small project
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/dashboard");
        }
    };


    return (
        <>
            <h2>Login</h2>
            <form className="loginForm" onSubmit={onLogin}>
                <input name="email" placeholder="Email" type="text"/>
                <input name="password" placeholder="Password" type="text"/>

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