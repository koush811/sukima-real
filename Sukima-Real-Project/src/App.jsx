import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Photo from "./pages/Photo";
import Detail from "./pages/Detail";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/photo"
        element={
          <ProtectedRoute>
            <Photo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;