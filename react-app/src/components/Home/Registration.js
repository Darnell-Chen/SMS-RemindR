import React from 'react';

function Registration(props) {
    return (
        <>
            <h2>Registration</h2>
            <form className="registerForm" id="registerForm" onSubmit={(e) => onRegister(e, props)}>
                <div className="register-name-Div">
                    <input name="fname" maxLength="20" placeholder="First Name" type="text"/>
                    <input name="lname" maxLength="20" placeholder="Last Name" type="text"/>
                </div>


                <input name="email" className="default-Inputs" placeholder="Email" maxLength="35" type="email"/>
                <input name="telephone" className="default-Inputs" placeholder="Phone Number" maxLength="10" type="tel"/>

                <div className="register-password-Div">
                    <input name="password" maxLength="25" placeholder="Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                    <input maxLength="25" placeholder="Re-Enter Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                </div>

                {(props.displayedMsg) ? <p className='login-register-msg'>{props.displayedMsg}</p> : <></>}

                <div className="register-options-div">
                    <a href="#" className="registerOption" onClick={() => changeForm(props)}>Already have an Account?</a>
                </div>

                <button className="RegisterButton" type="submit">Submit</button>

            </form>
        </>
    )
}

async function onRegister(e, props){
    // stops page from reloading automatically
    e.preventDefault();

    const currForm = new FormData(e.currentTarget);

    // for some reason, the formdata body isn't being recieved if I simply send the fetch request
    // as a multiform / default content-type
    const myData = new URLSearchParams(currForm).toString();

    console.log(currForm.get("fname"));

    try {
        const response = await fetch('http://127.0.0.1:3001/register', {
            method: 'POST',
            body: myData,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });
    
        if (response.ok) {
            console.log("success1")
            props.setMessage("Registration was Successful!");
            props.setForm("Login");
        }

    } catch {
        props.setMessage("Internal Server Error");
    }
}

function changeForm(props) {
    props.setMessage(null);
    props.setForm('Login');
}


export default Registration;