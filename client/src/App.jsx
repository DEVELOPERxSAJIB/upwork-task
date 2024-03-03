import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo/Todo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTask } from "./features/todo/todoApiSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTask());
  });

  return (
    <>
      
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
