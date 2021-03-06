// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 7777;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server is running on localhost: ${port}`);
}

// GET Data
app.get("/allData", sendData);

function sendData(request, response) {
  response.send(projectData);
}

// Post Data
app.post("/addData", addData);

function addData(request, response) {
  console.log(request.body);
  projectData.date = request.body.date;
  projectData.temperature = request.body.temperature;
  projectData.feeling = request.body.feeling;
  response.send(projectData);
  console.log(projectData);
}
