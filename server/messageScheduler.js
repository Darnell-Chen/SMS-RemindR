const schedule = require('node-schedule');
const connectToDatabase = require("./db");

let scheduleMap = {};

const scheduleMessages = async () => {
    const db = await connectToDatabase();
    const collection = await db.collection("Accounts");

    // returns all documents in the collection where Message size is > 0
    // https://www.geeksforgeeks.org/how-to-query-for-documents-where-array-size-is-greater-than-1-in-mongodb/
    const all_documents = await collection.find({$expr:{$gt:[{$size:{$ifNull:["$Messages",[]]}},0]}});

    // we map use a dict to map 'username + title' to schedule
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

    console.log(scheduleMap)
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
        console.log(messageObject.message);
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
        console.log('The world is going to end today.');
    });

    if (job) {
        scheduleMap[key] = job;
    }
}


async function removeMessage(messageObject) {

}

async function addMessage(messageObject) {

}

module.exports = scheduleMessages;