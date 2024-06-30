const connectToDatabase = require("../../db.js");

async function storeMessages(req) {
    const db = await connectToDatabase();
    const col_messages = db.collection('Messages');

    
}

module.exports = storeMessages;