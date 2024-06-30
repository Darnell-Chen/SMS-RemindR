/*This is the file that will host the neccessary HTTP communication between 
SMS and the cloud server
Things that this file should be capable of: 1) Update the Message count when one account 
sends a message to another account, 2) Update the respective bodies of the messages by adding
them to the respective message arrays of the two accounts communicating, 3) Should always send the
most recent message to the respective accounts, 4) (continue here)

Preprocessing Needs: 1) Need to import mongodb, 2) Need to import Twilio Module, 3) Need to import express.js, 
4) Need to parse for the database using the commands from mongodb. Will involve the use of the db object as well as its 
nested object called the collections object to access the accounts in question. May also need the query operators to do certain
things as well.

Ideas:
-Mentioned schedule.js framework for assistance
-Remmeber to link authToken from Twilio Console into .env file for encapsulation.
-
*/
const mongodb = require('mongodb');
const app = require('express');
// REQ CODING STATEMENTS #1: Inserting the accountSid and AuthToken from Twilio Console Here
const client = require('twilio')(accountSid, authToken);
const connectToDatabase = require('../db');
const MessagingResponse = require('twilio/lib/twiml/MessagingResponse');
const { checkUserExist } = require('./defaultMethods');
// IMPT: Arrow function should be replaced with a regular function to acheive modularity for 
async function messageAppearance (req, res) {
    // Here, I will use this request to make the message appear on both the sender and receiver's screen.
    // NOTE #1: Ideally, I want the request to be contain the message and the person that they want to send the particular 
    // message to. May involve having each message in the array contain the body of message and the person/Account to send the 
    // message to.
    try {const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');
    const person1 = {username: req.user.username };
    const person2 = {messageFromPerson2: req.body.message};//<-- Here, I will parse the message array, and then parse the nested object
    // to obtain the username of the person they are sending the message to.
    const twiml = new MessagingResponse();//<-- Object used to send the message from server to the accounts
    person1_JSON=col_accounts.find({username: person1.username}); 
    person2_JSON=col_accounts.find({username: person2.messageFromPerson2.receiver});
    // From here, I will parse req for the message and then use Twiml to send it to the 
    // number.
    // NOTE #2: Here, I also pondered on idea of keeping track of messages sent to a user by 
    // keeping it in inbox box. Could add as another field for the accounts?
    const desiredMessagetoSend = ""//<-- Will reference the message person1_JSON
    // Can place conditionals here that determine if message type is email, telephone, or discord[will default to telephone for now]
    client.messages.create( {
        body: desiredMessagetoSend,
        from: `${/*Here, I will insert the phone number of requester here*/0}`,
        to: `${/*Here, I will insert the phone number of the account receiving message here*/0}`
    })
    twiml.message(desiredMessagetoSend);
    res.type("text/xml").send(twiml.toString());

    }catch(Error) {
        console.error("Unable to send messages to both accounts")
    }


}
app.listen(3001, () => {console.log('Express server listening on port 3001');})