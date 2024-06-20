require('dotenv').config();

const express = require('express') 
const bodyParser = require('body-parser');
const cors = require('cors') 
const indexRoutes = require('./routes/indexRoutes');
const dashRoutes = require('./routes/dashRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');
const json = require('body-parser/lib/types/json');
// ^^ Note by Ardoine: I wanna delete this b/c its better if its
// in the indexRoutes.js file instead.

const connectToDatabase = require('./db');

const hostname = '127.0.0.1';
const port = 3001;
const uri = process.env.MONGODB_URI;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// the function to connect to MongoDB
async function run() {
  try {
    const mongoConnection = await connectToDatabase();
    console.log("successfully connected to DB");
  } catch (e) {

    console.log("Problem connecting to MongoDB Client:", e);
  }
}
run().catch(console.dir);


// starts up server on port 3001
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// this is the routes for all fetch requests from the index page (from front-end)
// as well as all fetch requests from dashboard
app.use(indexRoutes);
app.use(dashRoutes);
