import React from 'react';
import Login from './Login';

function Registration() {
    return (
        <>
            <h2>Registration</h2>
            <form className="registerForm">
                <div class="register-name-Div">
                    <input name="fname" maxlength="20" placeholder="First Name" type="text"/>
                    <input name="lname" maxlength="20" placeholder="Last Name" type="text"/>
                </div>


                <input className="default-Inputs" placeholder="Email" maxlength="35" type="email"/>
                <input className="default-Inputs" placeholder="Phone Number" maxlength="10" type="tel"/>

                <div className="register-password-Div">
                    <input maxlength="25" placeholder="Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                    <input maxlength="25" placeholder="Re-Enter Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                </div>

                <div className="register-options-div">
                    <button className="registerOption">Already have an Account?</button>
                </div>

                <input className="RegisterButton" type="submit"/>
            </form>
        </>
    )
}


export default Registration;