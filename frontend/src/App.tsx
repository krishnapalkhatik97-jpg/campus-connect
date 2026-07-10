import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
           path="/dashboard"
           element={
             <ProtectedRoute>
             <Dashboard />
             </ProtectedRoute>
             }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;