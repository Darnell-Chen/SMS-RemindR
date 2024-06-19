require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }) 

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();

router.use(express.json());

/************ Login Function *************/

router.post("/login", async (req, res) => {
    console.log("reached login operation");
    const {email, password} = req.body;
    const database_id = 'draft1';
    // PROGRESS #1: Create an if statement that 
    // checks if the size of the data produced by filtering
    // the documents in the accoutns collection by the 
    // data passed in is of size 0. If it is then the login 
    // falied. Otherwise, the login is successful and I should return
    // the JWT auth token.


    // this will be our jwt payload (typically defined as an JSON object)

    console.log(req);

    const user = {
        username: email
    }

    const draft1_db = client.db('draft1');
    coll_accounts = draft1_db.collection('Accounts');
    const count = await coll_accounts.countDocuments(user);
    
    try {
        if(count == 0) {
            // This means user daata is invalid.
            res.status(500).send("Login Unsuccessful");

        } else {
                console.log("Login Succesful");
                // this is the auth token that the user will store for continued connection
                const authToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 30});
                res.status(200).json({authToken: authToken});
        }

    } catch(Error) {
        console.log("Login Unsuccessful");
        res.status(501).send("Login Unsuccessful");
    }
})






/************ Register Function *************/

router.post("/register", async (req, res) => {
    console.log("reached registration operation");

    // all of the information passed in from form data
    const {fname, lname, telephone, email, password} = req.body;

    // creating user object using user input
    const newUser = {
        username: email,
        password: password,
        telephone: telephone,
        first_name: fname,
        last_name: lname,
        Family: []
        
        // Replicate JSON object with the 
        // JSON data representing the account.
    }

    const database_id = 'draft1';
    const draft1_db = client.db('draft1');
    coll_accounts = draft1_db.collection('Accounts');

    arrOfAccounts = draft1_db.collection('Accounts').find();//<-- Returns all of the 
    // accounts from the account collection from database.
    try {
        const count = await coll_accounts.countDocuments(newUser);

        console.log(count);

        if(count == 0) {
            console.log("here");
            // Implies that account doesn't exist which means we must 
            // add the account to the collections AND run MongoDB's 
            // createUser function.
            coll_accounts.insertOne(newUser);//<-- Inserts account inst into collections.
            // creating new user:

            res.status(200).send('Registration Successful');


        } else {
            throw failedRegistration;
        }


    } catch(failedRegistration) {
        console.error("Registration Failed");
        res.status(500).send("Registration Failed")
        // Will run function to run the neccessary error needed to 
        // be output as requested by Darnell.
    }
})


module.exports = router;