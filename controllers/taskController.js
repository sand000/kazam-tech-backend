const redisClient = require("../config/redisClient");
const Task = require("../models/taskModel");
require("dotenv").config();

const REDIS_KEY = process.env.REDIS_KEY;

const fetchAllTasks = async (req, res) => {
  try {
    const cached = await redisClient.get(REDIS_KEY);
    console.log("caches task from redis", cached);

    const redisTasks = cached ? JSON.parse(cached) : [];

    const mongoTasks = await Task.find({});
    const allTasks = [...redisTasks, ...mongoTasks.map((task) => task.text)];

    res.json({ tasks: allTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

module.exports = { fetchAllTasks };
