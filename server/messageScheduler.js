const schedule = require('node-schedule');
const connectToDatabase = require("./db");

const {sendDiscordMessage: sendDiscordMessage} = require("./discord");

let scheduleMap = {};

const scheduleMessages = async () => {
    const db = await connectToDatabase();
    const collection = await db.collection("Accounts");

    // returns all documents in the collection where Message size is > 0
    // https://www.geeksforgeeks.org/how-to-query-for-documents-where-array-size-is-greater-than-1-in-mongodb/
    const all_documents = await collection.find({$expr:{$gt:[{$size:{$ifNull:["$Messages",[]]}},0]}});

    // we map use a dict to map 'username + title' to a scheduled job
    for await (const doc of all_documents) {
        const currMessages = doc.Messages;
        for (let i = 0; i < currMessages.length; i++) {

            // console.log(currMessages[i])

            // we'll use the 2 immutable and non-replicable attributes for the key: 
            // the username (email) and the tite of the message
            const key = doc.username + " " + currMessages[i].title;

            if (currMessages[i].freqType == "periodic") {
                schedulePeriodic(key, currMessages[i]);
            } else if (currMessages[i].freqType == "once") {
                scheduleOnce(key, currMessages[i]);
            }
        }
    }

    console.log("Length of Dict: " + Object.keys(scheduleMap).length)
}

function schedulePeriodic(key, messageObject) {

    // we'll use daysOfWeek to find out what the range should be for our schedule - where 0 corresponds to Sunday and 6 corresponds to Saturday
    const daysOfWeek = ['sun','mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    let scheduleRange = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
        if (messageObject[daysOfWeek[i]]) {
            scheduleRange.push(i);
        }
    }

    // rule for recurring node-schedule schedule
    // https://www.npmjs.com/package/node-schedule
    // view 'Recurrence Rule Scheduling' and 'RecurrenceRule properties' 
    const hour_minute_split = messageObject.time.split(':');
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = scheduleRange;
    rule.hour = Number(hour_minute_split[0]);
    rule.minute = Number(hour_minute_split[1]);

    const job = schedule.scheduleJob(rule, () => {
        sendMessage(messageObject);
        delete scheduleMap[key];
    });

    // cautionary check in case a form is retrieved where no days were selected
    if (scheduleRange.length > 0) {
        scheduleMap[key] = job;
    }
}


function scheduleOnce(key, messageObject) {
    const date = new Date(messageObject.datetime);

    // returns null if the datetime is from the past/already past
    const job = schedule.scheduleJob(date, () => {
        sendMessage(messageObject);
    });

    // validates that the job was actually scheduled before adding to dictionary
    if (job) {
        scheduleMap[key] = job;
    }
}

function sendMessage(messageObject){
    const contactType = messageObject.contactType;

    if (contactType === 'discord') {
        sendDiscordMessage(messageObject.discord, messageObject.message);
    }
}


function removeMessage(messageObject) {
    // make sure to cancel the job first before removing from list
    const key = messageObject.user.username + " " + messageObject.body.title;

    // this just checks that the message could potentially be in our dict before searching
    if (messageObject.body.freqType == 'once') {
        const currDate = Date.now();
        const messageDate = new Date(messageObject.body.datetime);
        const dateDiff = messageDate - currDate;

        if (dateDiff < 0) {
            return;
        }
    }

    try {
        scheduleMap[key].cancel();
        delete scheduleMap[key];

    } catch (e) {
        console.log("Trying to remove message with key: " + key + " but couldn't be done.");
    }
}

// messageObject is just the default req that is sent to the route handler
function addMessage(messageObject) {
    const key = messageObject.user.username + " " + messageObject.body.title;

    if (messageObject.body.freqType == "periodic") {
        schedulePeriodic(key, messageObject.body);
    } else if (messageObject.body.freqType == "once") {
        scheduleOnce(key, messageObject.body);
    }
}

module.exports = {scheduleMessages, removeMessage, addMessage};