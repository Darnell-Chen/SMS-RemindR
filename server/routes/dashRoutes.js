require('dotenv').config();

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }) 


/**************************** Route for Getting User Data *******************************/

router.get("/getData", authenticateToken, (req, res) => {

    // we'll attach a new jwt access token that will have another 30 minutes of access using the same user object
    const user = {
        // how you get user email - use req.user.email to query for user
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



/**************************** Route for Adding Family Members *******************************/

router.post("/addMember", authenticateToken, (req, res) => {
    const user = {
        // how you get user email - use req.user.email to query for user
        username: req.user.username
    }

    const query = req.user.username;

    const newToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 30});
    // TASK #1: Use user data to prepare JSON data to be added to the family array 
    // that the current family member[aka the one who did request] has. This will require
    // the use of the U in the CRUD acronym commands for mongodb. Also, keep in mind that 
    // some of the commands may NOT transfer between mongosh and mongodb node driver.
    // Questions that I have: 1) Is res the JSON data of new family member? 2) How to 
    // derive token that references the person requested by user?
    const database_id = client.db("draft1");
    const col_accounts = database_id.collection('Accounts');
    const count = col_accounts.countDocuments(user).then(() => {return col_accounts.countDocuments(user);});
    try {
        if(count == 0) {
            throw Error;

        } else {
            arr = col_accounts.findOne({"username": user.email}).Family
            arr.push(user /*Will insert JSON data referencing the person they want to add here*/)
            col_accounts.updateOne({"username": ""/*will insert person requesting here via jwt token*/}
                /*Insert the filter involving use of query operator that references the family members of the current requester.*/,
                {"Family": arr}
                /*Here, I will modify the family field in the document of JSON data referencing the requester[for lack of better words]*/
            );
        }
        col_accounts.updateOne({"username": user.email},{$set: {authToken: newToken}});
        //^^ Here, I add new token to the JSON document referenced by user.
        userJSON = col_accounts.findOne({"username": user.email})
        user.authToken = newToken;
        res.status(200).json(userJSON)    
    }catch(Error) {
        console.log("Family member doesn't exist")
        res.status(500).send("Member Addition Unsuccessful");

    }
    return ;
    
})






/**************************** Authentication Middleware *******************************/

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