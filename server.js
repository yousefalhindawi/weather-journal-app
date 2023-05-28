/* Start Of Dependencies */
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const dataRouter = require("./routers/routes/dataRoute");
/* End Of Dependencies */

const port = 8080;
// Start up an instance of app
const app = express();

/* Start Of Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
/* End Of Middleware*/

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const listening = () => {
  console.log(`running on localhost: ${port}`);
};
const server = app.listen(port, listening);

// routers
app.use("/api/", dataRouter);
