import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../../features/todo/todoApiSlice";
import { timeAgo } from "../../../utils/timeAgo";
import { toastAlert } from "../../../utils/toastAlert";
import { setMessageEmpty } from "../../features/todo/todoSlice";
import Swal from "sweetalert2";

const Todo = () => {
  const dispatch = useDispatch();
  const { todos, message, error } = useSelector((state) => state.todo);

  // Edit task modal
  const [show, setShow] = useState(false);

  // create task
  const [task, setTask] = useState("");
  const handelCreateTask = (e) => {
    e.preventDefault();
    dispatch(createTask({ task }));
  };

  // Edit task
  const [singleTask, setSingleTask] = useState({});

  const handleEditTask = (id) => {
    // open modal
    setShow(true);

    // find single task
    const task = todos.find((task) => task._id === id);
    setSingleTask(task);
  };

  useEffect(() => {
    setInput({
      task: singleTask?.task || "",
      status: singleTask?.status || "",
    });
  }, [singleTask]);

  const [input, setInput] = useState({
    task: singleTask?.task,
    status: singleTask?.status,
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: singleTask?._id,
      task: input?.task,
      status: input?.status,
    };
    dispatch(updateTask(data));
  };

  // delete task
  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Item will be deleted forever",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id));
      }
    });
  };

  useEffect(() => {
    if (message) {
      toastAlert({ type: "success", msg: message });
      setTask("");
      dispatch(setMessageEmpty());
    }
    if (error) {
      toastAlert({ type: "error", msg: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <div className="container py-5">
        <div className="row mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Card className="shadow border-0">
              <h3 className="text-center py-3">TODO APP</h3>
              <Card.Body>
                <Form onSubmit={handelCreateTask}>
                  <Form.Group
                    className="mb-3 d-flex gap-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Add New Task . . ."
                      className="w-75"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                    <Button type="submit" variant="success" className="w-25">
                      Add Task
                    </Button>
                  </Form.Group>
                </Form>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.task}</td>

                        <td
                          style={
                            (item.status === "pending" && {
                              color: "rebeccapurple",
                            }) ||
                            (item.status === "complete" && {
                              color: "green",
                            }) ||
                            (item.status === "cancel" && { color: "red" })
                          }
                        >
                          {item.status}
                        </td>
                        <td>{timeAgo(item.createdAt)}</td>
                        <td>
                          {item.createdAt === item.updatedAt
                            ? "Not Yet"
                            : timeAgo(item.updatedAt)}
                        </td>
                        <td>
                          <Button
                            onClick={() => handleEditTask(item._id)}
                            size="sm"
                            variant="warning"
                          >
                            <CiEdit />
                          </Button>
                          {"  "}
                          <Button
                            onClick={() => handleDeleteTask(item._id)}
                            size="sm"
                            variant="danger"
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>

      {/* Task Edit Modal */}
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Label>
              <strong>Task :</strong>
            </Form.Label>
            <Form.Group
              className="mb-3 d-flex gap-3"
              controlId="formBasicEmail"
            >
              <Form.Control
                value={input.task}
                onChange={handleInputChange}
                name="task"
                type="text"
                className=""
              />
            </Form.Group>{" "}
            <Form.Label>
              <strong>Status : </strong>
            </Form.Label>
            <Form.Group>
              <Form.Select
                className="mb-3 d-flex gap-3"
                value={input.status}
                onChange={handleInputChange}
                name="status"
              >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
                <option value="cancel">cancel</option>
              </Form.Select>
            </Form.Group>
            <Button
              className="w-100"
              variant="warning"
              type="submit"
              onClick={() => setShow(false)}
            >
              Update Now
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Todo;
