import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Photo from "./pages/Photo";
import Detail from "./pages/Detail";

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

    return unsubscribe;

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Routes>

      <Route
        path="/"
        element={user ? <Home /> : <Login />}
      />

      <Route
        path="/home"
        element={user ? <Home /> : <Login />}
      />

      <Route
        path="/schedule"
        element={user ? <Schedule /> : <Login />}
      />

      <Route
        path="/photo"
        element={user ? <Photo /> : <Login />}
      />

      <Route
        path="/detail/:id"
        element={user ? <Detail /> : <Login />}
      />

    </Routes>
  );
}

export default App;