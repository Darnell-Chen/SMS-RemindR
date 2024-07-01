require('dotenv').config();

const connectToDatabase = require('../db');
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
router.use(express.json())//<-- this is required for sending data from backend to frontend and vice versa

const {checkUserExist, checkMessageExist, authenticateToken, genToken} = require("./defaultMethods");

router.delete("/deleteMember", authenticateToken, checkUserExist, async (req, res) => {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');

    try {
        const filter = {
            username: req.user.username,
            Messages : {
                $elemMatch: { title: req.body.title }
            }
        };

        // this will specifiy that we want to pull array objects in 'Family' where the name matches the one the user inputted
        const update = {
            $pull: { 
                Messages: { 
                    title: req.body.title
                }
            }
        };

        const removeMember = await col_accounts.updateOne(filter, update);

        
        if (removeMember.modifiedCount == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(450);
        }

    } catch (e) {
        console.log(e);
        res.sendStatus(450);
    }
})

module.exports = router;