const express = require("express");
const router = express.Router();

const { fetchAllTasks } = require("../controllers/taskController");

router.get("/fetchAllTasks", fetchAllTasks);

module.exports = router;
