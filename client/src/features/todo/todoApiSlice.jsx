import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all todos
export const getAllTask = createAsyncThunk("getAllTask", async () => {
  try {
    const response = await axios.get(
      `http://localhost:5050/api/v1/todo/get-todos`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create a new task
export const createTask = createAsyncThunk("createTask", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/todo/create`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete new task
export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/todo/delete-task/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete new task
export const updateTask = createAsyncThunk("updateTask", async (data) => {
  console.log(data)
  try {
    const response = await axios.patch(
      `http://localhost:5050/api/v1/todo/update-task/${data.id}`,
      {
        task: data.task,
        status: data.status,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
