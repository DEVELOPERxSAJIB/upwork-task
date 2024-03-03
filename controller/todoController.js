const Todo = require("../model/Todo");

/**
 * @DESC get all task
 * @ROUTE api/v1/todo/get-todos
 * @Method GET
 * @access public
 */
const getAllTask = async (req, res) => {
  try {
    const todo = await Todo.find();

    res.status(200).json({
      success: true,
      payload: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @DESC create a task
 * @ROUTE api/v1/todo/create
 * @Method POST
 * @access public
 */
const createTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(404).json({
        message: " Task feild is required",
      });
    }

    // existing task
    const existTask = await Todo.findOne({ task });
    if (existTask) {
      return res.status(404).json({
        message: "Task already exists",
      });
    }

    // create new task
    const todo = await Todo.create({
      task,
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      payload: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @DESC delete a task
 * @ROUTE api/v1/todo/delete-task
 * @Method DELETE
 * @access public
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: " ID is not valid",
      });
    }

    // delete a task
    const todo = await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task Deleted",
      payload: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @DESC update a task
 * @ROUTE api/v1/todo/update-task
 * @Method PATCH
 * @access public
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, status } = req.body;

    if (!id) {
      return res.status(404).json({
        message: " ID is not valid",
      });
    }

    // update task
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        task: task,
        status: status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task Updated",
      payload: {
        todo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
};
