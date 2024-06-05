import React from 'react';

function Registration() {
    return (
        <>
            <h2>Registration</h2>
            <form className="registerForm">
                <div class="register-name-Div">
                    <input name="fname" placeholder="First Name" type="text"/>
                    <input name="lname" placeholder="Last Name" type="text"/>
                </div>

                <input placeholder="Email" type="text"/>

                <div className="register-password-Div">
                    <input placeholder="Password" type="text"/>
                    <input placeholder="Re-Enter Password" type="text"/>
                </div>

                <div className="register-options-div">
                    <button className="registerOption">Already have an Account?</button>
                </div>

                <button className="RegisterButton">Register</button>
            </form>
        </>
    )
}

export default Registration;