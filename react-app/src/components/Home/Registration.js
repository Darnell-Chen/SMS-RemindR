import React from 'react';

function Registration(props) {
    return (
        <>
            <h2>Registration</h2>
            <form className="registerForm" onSubmit={onRegister}>
                <div class="register-name-Div">
                    <input name="fname" maxLength="20" placeholder="First Name" type="text"/>
                    <input name="lname" maxLength="20" placeholder="Last Name" type="text"/>
                </div>


                <input className="default-Inputs" placeholder="Email" maxLength="35" type="email"/>
                <input className="default-Inputs" placeholder="Phone Number" maxLength="10" type="tel"/>

                <div className="register-password-Div">
                    <input maxLength="25" placeholder="Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                    <input maxLength="25" placeholder="Re-Enter Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                </div>

                <div className="register-options-div">
                    <a href="#" className="registerOption" onClick={() => props.setForm('Login')}>Already have an Account?</a>
                </div>

                <button className="RegisterButton" type="submit">Submit</button>
            </form>
        </>
    )
}

async function onRegister(e){
    // stops page from reloading automatically
    e.preventDefault();

    console.log(e);

    const currForm = new FormData(e.currentTarget);

    const fName = currForm.get("fname");
    
}

export default Registration;