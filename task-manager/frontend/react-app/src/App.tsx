import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./features/auth/pages/TasksPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/tasks" element={<TasksPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
