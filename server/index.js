require('dotenv').config();

const express = require('express') 
const bodyParser = require('body-parser');
const cors = require('cors') 
const indexRoutes = require('./routes/indexRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');

const hostname = '127.0.0.1';
const port = 3001;
const uri = "mongodb+srv://Chore:Door@sms-remindr.xozoopn.mongodb.net/?retryWrites=true&w=majority&appName=SMS-RemindR";

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      client.connect();
      // Send a ping to confirm a successful connection
      client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      // connect to mongodb client here so we don't have to reconnect every fetch
      
    });

  } catch (e) {
    console.log("Problem connecting to MongoDB Client:", e);
  }
}
run().catch(console.dir);



// this is the routes for all fetch requests from the index page (from front-end)
app.use(indexRoutes);
