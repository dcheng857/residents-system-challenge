import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Layout } from "./components/Layout";
import { Login } from "./features/login";
import { Programs } from "./features/program";
import { AddProgram } from "./features/program/AddProgram";
import { Residents } from "./features/resident";
import { AddResident } from "./features/resident/AddResident";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Residents />} />
          <Route path="/resident/add" element={<AddResident />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/program/add" element={<AddProgram />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <MyRoutes />
      <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
    </main>
  );
}

export default App;
