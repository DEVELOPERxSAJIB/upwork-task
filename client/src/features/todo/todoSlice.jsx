import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, getAllTask, updateTask } from "./todoApiSlice";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loader: false,
    error: null,
    message: null,
  },

  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.todos = action.payload.payload.todo;
      })
      .addCase(createTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload.payload.todo];
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.todos = state.todos.filter(
          (item) => item._id !== action.payload.payload.todo._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.todos[
          state.todos.findIndex(
            (data) => data._id === action.payload.payload.todo._id
          )
        ] = action.payload.payload.todo;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

export const { setMessageEmpty } = todoSlice.actions;

export default todoSlice.reducer;
