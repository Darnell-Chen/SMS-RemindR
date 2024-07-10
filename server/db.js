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


// This is our Singleton Database Connection.
// we'll initialize function in index.js, then every other route will use the same connectionp
let db;

const connectToDatabase = async () => {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = await client.db('draft1');
    return db;
  } catch {
    console.log("error connecting to MongoDB in db.js");
  }
};

module.exports = connectToDatabase;