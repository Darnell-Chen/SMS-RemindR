const express = require('express') 
const bodyParser = require('body-parser');
const cors = require('cors') 

const hostname = '127.0.0.1';
const port = 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  if (req.url === '/#') {
      res.redirect('/');
  } else {
      next();
  }
});


app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);

  // tells you what action to do
  // based on this, do async functions for the action
  console.log(req.body.action);

  res.status(201).send("Account registered successfully.");
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // connect to mongodb client here so we don't have to reconnect every fetch
});