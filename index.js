const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./route/taskRoute.js");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const client = require("./services/mqttHandler.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

connectDB();

app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
