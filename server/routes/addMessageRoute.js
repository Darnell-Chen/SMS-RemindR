require('dotenv').config();

const connectToDatabase = require('../db');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
router.use(express.json())//<-- this is required for sending data from backend to frontend and vice versa

const {checkUserExist, checkMessageExist, authenticateToken, genToken} = require("./defaultMethods");


/**************************** Route for Getting User Data *******************************/

router.get("/getData", authenticateToken, checkUserExist, async (req, res) => {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    try {
        const userInfo = await col_accounts.findOne({username: req.user.username});
        if (!userInfo) {
            throw new Error("Error fetching user data from MongoDB");
        }
        
        res.status(200).json({
            authToken: genToken(req),
            userInfo: userInfo
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(404);
    }
    
})



/**************************** Route for Adding Family Members *******************************/

router.post("/addMember", authenticateToken, checkUserExist, checkMessageExist, async (req, res) => {


    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    try {

        // the query and action for adding the message to Message Array
        const query = {
            "username": req.user.username
        }

        console.log(req.body);

        // this will update/push the array with the new message
        const result = await col_accounts.updateOne(query, {$push: { Messages: req.body}});


        // check that it was a success
        if (result.modifiedCount !== 1) {
            res.sendStatus(404);
            return;
        }

        res.sendStatus(200);
        console.log("successfully added Message for user  " + req.user.username);

    }catch(Error) {
        // console.log("Family member doesn't exist")
        console.log("Problem Adding Message");
        res.status(500).send("Message Addition Unsuccessful");
    }
})

module.exports = router;