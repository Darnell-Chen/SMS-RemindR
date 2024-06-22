require('dotenv').config();

const connectToDatabase = require('../db');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
router.use(express.json())//<-- this is required for sending data from backend to frontend and vice versa


/**************************** Route for Getting User Data *******************************/

router.get("/getData", authenticateToken, async (req, res) => {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    const userExist = checkUserExist(req, col_accounts);
    if (!userExist) {
        res.status(404);
        return;
    }

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

router.post("/addMember", authenticateToken, async (req, res) => {


    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    // this will automatically return status not okay if the user doesn't exist
    const userExist = await checkUserExist(req, col_accounts);
    if (!userExist) {
        res.sendStatus(404);
        return;
    }

    // we'll first check if the family member already exists in array
    const familyExist = await checkFamilyExist(req, col_accounts);
    if (!familyExist) {
        res.sendStatus(404);
        return;
    }

    try {

        // the query and action for adding the family member to the array of Family
        const query = {
            "username": req.user.username
        }

        // this will update the array with the new member
        const result = await col_accounts.updateOne(query, {$push: { Family: req.body}});


        // check that it was a success
        if (result.modifiedCount !== 1) {
            res.sendStatus(404);
            return;
        }

        const increaseFamily = await col_accounts.updateOne(query, {$inc: {familyCount: 1}});
        if (increaseFamily.modifiedCount !== 1) {
            res.sendStatus(404);
            return;
        }

        res.sendStatus(200);
        console.log("successfully added member to family for " + req.user.username);

    }catch(Error) {
        // console.log("Family member doesn't exist")
        console.log("Problem Adding Member");
        res.status(500).send("Member Addition Unsuccessful");
    }

    // return ;
    
})


/************************ Checks if the user exists ***********************************/
async function checkUserExist(req, col_accounts) {
    const count = await col_accounts.countDocuments({username: req.user.username});
    if (count !== 1) {
        return false;
    } else {
        return true;
    }
}



/************** Checks if the added individual already exists in our array ************/
async function checkFamilyExist(req, col_accounts) {
    const query = {
        "username": req.user.username,
        "Family": {
            $elemMatch: { name: 'John Doe' }
        }
    };

    const exist = await col_accounts.findOne(query);

    if (exist) {
        console.log("This individual already exists in the User's Family");
        return false;
    } else {
        return true;
    }
}



/**************************** Authentication Middleware *******************************/

function authenticateToken(req, res, next) {
    const authToken = req.headers['authorization'];

    // separating b/c the Auth header will be of form "Bearer <token>", where we only need the token
    const token = authToken && authToken.split(" ")[1];

    if (token == null) {
        console.log("TOKEN IS NULL - check if token has bearer");
        return res.sendStatus(403);
    }

    // user here is the user/email object we passed in loginOperation()
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log("ERROR IN VERTIFICATION");
            return res.sendStatus(403);
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

module.exports = router;