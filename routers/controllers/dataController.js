// Setup empty JS object to act as endpoint for all routes
projectData = {};

// get current data
const getCurrentData = (req, res) => {
    try {
        res.send(projectData);
    } catch (error) {
        console.log("getCurrentData error", error);
    }
};

// create data
const addData = (req, res) => {
  try {
    const { name, temperature, date, userResponse } = req.body;
    projectData.name = name;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    res.send({ message: "Data received and stored successfully" });
  } catch (error) {
    console.log("addData error", error);
  }
};

module.exports = {
  addData,
  getCurrentData,
};
