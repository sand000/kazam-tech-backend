const mqtt = require("mqtt");
const redisClient = require("../config/redisClient");
const Task = require("../models/taskModel");
require("dotenv").config();
const REDIS_KEY = process.env.REDIS_KEY;
const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/add", (err) => {
    if (err) {
      console.error("Failed to subscribe to /add:", err);
    } else {
      console.log("Subscribed to /add");
    }
  });
});

client.on("message", async (topic, message) => {
  const payload = message.toString();
  try {
    const { task } = JSON.parse(payload);
    if (!task) return console.warn("Empty or missing task in payload");

    let currentList = [];
    const cachedData = await redisClient.get(REDIS_KEY);
    if (cachedData) currentList = JSON.parse(cachedData);

    currentList.push(task);

    if (currentList.length > 50) {
      await Task.insertMany(currentList.map((text) => ({ task: text })));
      await redisClient.del(REDIS_KEY);
      console.log("Moved to MongoDB and flushed cache.");
    } else {
      await redisClient.set(REDIS_KEY, JSON.stringify(currentList));
      console.log("Item added to Redis:", task);
    }
  } catch (err) {
    console.error("MQTT Error: Invalid JSON or Redis failure:", err);
  }
});

module.exports = client;
