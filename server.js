const express = require("express");
const todoRoute = require("./routes/todoRoute");
const connectDatabase = require("./config/configDB");
const cors = require('cors')

// init app
const app = express();

// config dotven
require("colors");
require("dotenv").config();

// use cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true,
}))

// init JSON middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init routes
app.use("/api/v1/todo", todoRoute)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `server is running on port ${PORT}`.bgBlue
  );

  connectDatabase()
});