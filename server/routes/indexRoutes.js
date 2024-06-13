require('dotenv').config();

const jwt = require("jsonwebtoken");
const express = require('express');

const router = express.Router();



/************ Login Function *************/

router.post("/login", (req, res) => {
    console.log("reached login operation");

    const {email, password} = req.body;

    // this will be our jwt payload (typically defined as an JSON object)
    const user = {
        email: email
    }

    // this is the auth token that the user will store for continued connection
    // authToken (accessToken) will last for 30 minutes while refresh token lasts for 30 days
    const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 30});
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_KEY, {expiresIn: 60 * 60 * 24 * 30});

    res.status(201).json({
        authToken: authToken,
        refreshToken: refreshToken
    });
})






/************ Register Function *************/

router.post("/register", (req, res) => {
    console.log("reached registration operation");

    res.status(200).send('Response from registration operation');

    // all of the information passed in from form data
    const {fname, lname, telephone, email, password} = req.body;

    // creating user object using user input
    const user = {
        username: email,
        number: telephone
    }

    console.log(req.body.email);

    console.log(user);
})


module.exports = router;