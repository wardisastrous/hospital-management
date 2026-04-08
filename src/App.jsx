import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patients from "./pages/Patients";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;