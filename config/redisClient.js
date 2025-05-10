const Redis = require("redis");
require("dotenv").config();

const redisClient = Redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

redisClient
  .connect()
  .then(() => {
    console.log("Redis Connected");
  })
  .catch(console.error);

module.exports = redisClient;
