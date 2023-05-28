const items = require("express").Router();
const dataController = require("../controllers/dataController");

items.get("/data", dataController.getCurrentData);
items.post("/data", dataController.addData);

module.exports = items;
