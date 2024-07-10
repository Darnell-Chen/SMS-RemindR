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
-Remmeber to link authToken from Twilio Console into .env file for encapsulation. Link to 
Twilio Console:  https://www.twilio.com/login
-
Report Tab:
-[6/30/24 @ 10:24PM] Practically finished the psuedocode. currently learning more about twilio so I can implement the sms messaging feature.
Also need to find the twilio subAPI required to send messages via email as well. Once this is done I will commit this to repo.
*/
const mongodb = require('mongodb');
const express = require('express');
const app = express();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
// REQ CODING STATEMENTS #1: Inserting the accountSid and AuthToken from Twilio Console Here
const client = require('twilio')(accountSid,authToken);
// const email_api = require('@sendgrid/mail');//<-- Will require installing of another module
const connectToDatabase = require('../db');
const MessagingResponse = require('twilio/lib/twiml/MessagingResponse');
const router = app.Router();
// IMPT: Arrow function should be replaced with a regular function to acheive modularity for 
async function messageAppearance (req, res) {
    // Here, I will use this request to make the message appear on both the sender and receiver's screen.
    // NOTE #1: Ideally, I want the request to be contain the message and the person that they want to send the particular 
    // message to. May involve having each message in the array contain the body of message and the person/Account to send the 
    // message to.
    // JSON data I want to req to be: req: {..., body: {accountJSON[which will be implicit within the body JSON object]: {..., Message: {receiver: "<<username of receiver>>", Title: "<<title of msg>>", type: "<<msg type>>", message: "<<actual msg>>" }}}}
    try {
    const db = await connectToDatabase();
    const col_accounts = db.collection('Accounts');
    const person1 = {username: req.body.username, messageToPerson2: req.body.Message};
    const message_title = req.body.Message.Title;//<-- Make sure to tell darnell to send msgtitle as its own field
    // in the JSON data sent in http request. Also, the second param ensures that the JSON data returned is only the msgtitle.
    const twiml = new MessagingResponse();//<-- Object used to send the message from server to the accounts
    const person1_JSON=col_accounts.find({username: person1.username}); 
    const person2_JSON=col_accounts.find({username: person1.messageToPerson2.receiver});
    // From here, I will parse req for the message and then use Twiml to send it to the 
    // number.
    // NOTE #2: Here, I also pondered on idea of keeping track of messages sent to a user by 
    // keeping it in inbox box. Could add as another field for the accounts?
    const desiredMessagetoSend = "";//<-- Will reference the message person1_JSON
    // Can place conditionals here that determine if message type is email, telephone, or discord[will default to telephone for now]
         // Using algorithm to parse for the desired message to send here
    const arrOfPotentialAccs = col_accounts.find({"Message.Title": message_title});
    for(let i = 0; i < arrOfPotentialAccs.length();++i) {
        if(arrOfPotentialAccs[i].first_name =                 /*arrOfPotentialAccs[i].username === req.body.username*/) {
            desiredMessagetoSend=arrOfPotentialAccs[i].Message.message;
        }
    }
        // After algorithm finishes:        
    const msgType = 'sms';//person1_JSON.Message.type;
    const receiverTelephone = "+18555241702"; 
    if(msgType == "sms") { 
   
        await client.messages.create( {
            body: desiredMessagetoSend,
            from: `+${person1_JSON.telephone/*Here, I will insert the phone number of requester here*/}`,
            to: `+${receiverTelephone/*Here, I will insert the phone number of the account receiving message here*/}`
        })
        twiml.message(desiredMessagetoSend);
        res.type("text/xml").send(twiml.toString());
        // QUESTION #1: Should we store the message sent somewhere after it is sent via sms?

    } else if(msgType == "email") {
        console.log("Created comment regarding this feature. Unavailable atm");
        // Will insert subject here if provided in message[NOTE for Darnaell: Need to specify if user wants to send email].
 /*       const email = {
            to: person2_JSON.username,
            from: person1_JSON.username,
            subject: "Placeholder",
            text: desiredMessagetoSend,
        }
        try {
            await email_api.send(msg);
        } catch(Error) {
            console.error(Error);
            if(Error.response) {
                console.error(Error.response.body);
            }
        }
            NOTE #3: Commented out code above b/c it requires another module. Will discuss with 
            you in meeting.

        */
    } else if(msgType == "discord") {
        console.log("Message type was discord. Feature unavailable right now.");
    }
    

    }catch(Error) {
        console.error("Unable to send message")
    } 
    /* PsuedoNotes from Meeting[#5]: 
    -To find the message, need to parse through each document in the Account collection for the 
    title of the message from the req object.
    -Some cases to adhere to: When size of messages field referencing array is > 0, then this is 
    when we will use node-scheduler object form the node-schedule.js framework.  
    -For the messages there are freqeuncy types whose domain is of size two which are periodic and once[aka single-use]. 
    IMPT: WIll need conditional involving the value of the frequency type. If periodic is the value of freqType, then need to parse 
    the array of days.
    -
    */


}
router.post("/msg1",async(req, res) => {
  await messageAppearance(req,res);
})
app.listen(3001, () => {console.log('Express server listening on port 3001');})