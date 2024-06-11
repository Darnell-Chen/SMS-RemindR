require('dotenv').config();

const jwt = require("jsonwebtoken");
const express = require('express');

const router = express.Router();

// a middleware to say the "/" and "/#" origins are the same
router.use((req, res, next) => {
    if (req.url === '/#') {
        res.redirect('/');
    } else {
        next();
    }
});



/************ Post for Index *************/


router.post("/", (req, res) => {

    if (req.body.action && req.body.action === "login") {
        loginOperation(req, res);

    } else if (req.body.action && req.body.action === "registration") {
        registerOperation(req, res);

    } else {
        res.status(300).send("No Actions.");
    }
})







/************ Login Function *************/

function loginOperation(req, res) {
    console.log("reached login operation");

    const {email, password} = req.body;

    // this will be our jwt payload (typically defined as JSON object)
    const user = {
        email: email
    }

    // this is the auth token that the user will store for continued connection
    const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY);

    res.json({authToken: authToken})
}






/************ Register Function *************/

function registerOperation(req, res) {
    console.log("reached registration operation");

    res.status(200).send('Response from registration operation');

    // all of the information passed in from form data
    const {fname, lname, telephone, email, password} = req.body;

    // creating user object using user input
    const user = {
        username: email,
        number: telephone
    }

    console.log(user);
}



function authenticateToken(req, res, next) {

}


module.exports = router;