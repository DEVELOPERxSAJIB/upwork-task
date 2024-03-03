const express = require("express");
const { createTask, getAllTask, deleteTask, updateTask, singleTask } = require("../controller/todoController");

// init routes
const todoRoute = express.Router();

todoRoute.route("/create").post(createTask);
todoRoute.route("/get-todos").get(getAllTask);
todoRoute.route("/delete-task/:id").delete(deleteTask);
todoRoute.route("/update-task/:id").patch(updateTask);


module.exports = todoRoute;
