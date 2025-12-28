import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  // track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login and Register pages */}
        {!isLoggedIn && (
          <>
            <Route
              path="/"
              element={<Login setUser={() => setIsLoggedIn(true)} />}
            />
            <Route
              path="/register"
              element={<Register setUser={() => setIsLoggedIn(true)} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Home page after login */}
        {isLoggedIn && <Route path="/" element={<Home />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
