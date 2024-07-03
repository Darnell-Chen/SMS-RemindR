require('dotenv').config();

const connectToDatabase = require('../db');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
router.use(express.json())//<-- this is required for sending data from backend to frontend and vice versa



/************************ Checks if the user exists ***********************************/
async function checkUserExist(req, res, next) {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    const count = await col_accounts.countDocuments({username: req.user.username});

    if (count !== 1) {
        return res.sendStatus(403);
    } else {
        next();
    }
}



/************** Checks if the added individual already exists in our array ************/
async function checkMessageExist(req, res, next) {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    const query = {
        "username": req.user.username,
        "Messages": {
            $elemMatch: { title: req.body.title }
        }
    };

    const exist = await col_accounts.findOne(query);

    if (exist) {
        console.log("This message already exists");
        return res.sendStatus(403);
    } else {
        next();
    }
}



/**************************** Authentication Middleware *******************************/

function authenticateToken(req, res, next) {

    const authToken = req.headers['authorization'];

    // separating b/c the Auth header will be of form "Bearer <token>", where we only need the token
    const token = authToken && authToken.split(" ")[1];

    if (token == null) {
        console.log("TOKEN IS NULL - check if token has bearer");
        return res.sendStatus(401);
    }

    // user here is the user/email object we passed in loginOperation()
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log("ERROR IN VERTIFICATION");
            return res.sendStatus(401);
        }

        // attaches user to the request so we can grab the user data
        // else, we can use jwt.decode to get the user object
        req.user = user;

        console.log(req.user);

        // since jwt.verify is async, we have to place next() inside of the function to finish up this function first
        next();
    });
}

/***************************** Generated New Auth Token ****************************/


function genToken(req) {
    const user = {
        // how you get user email - use req.user.email to query for user
        username: req.user.username
    }

    const newToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 30});
    return newToken;
}

module.exports = {checkUserExist, checkMessageExist, authenticateToken, genToken};