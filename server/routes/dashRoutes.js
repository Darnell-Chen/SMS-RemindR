require('dotenv').config();

const jwt = require("jsonwebtoken");
const express = require('express');

const router = express.Router();

router.get("/getData", authenticateToken, (req, res) => {

    // we'll attach a new jwt access token that will have another 30 minutes of access using the same user object
    const user = {
        email: req.user.email
    }
    const newToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 30});

    
    // then we fetch user info
    // then we return user info w/ new token
    res.status(200).json({
        authToken: newToken,
        fname: "Darnell",
        lname: "Chen",
        familyCount: 0,
        messageCount: 0
    });
})



function authenticateToken(req, res, next) {
    const authToken = req.headers['authorization'];

    // separating b/c the Auth header will be of form "Bearer <token>", where we only need the token
    const token = authToken && authToken.split(" ")[1];

    if (token == null) {
        return res.sendStatus(403);
    }

    // user here is the user/email object we passed in loginOperation()
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // attaches user to the request so we can grab the user data
        // else, we can use jwt.decode to get the user object
        req.user = user;
    });

    next();
}

module.exports = router;