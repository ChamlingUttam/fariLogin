import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Nav from './pages/Nav';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* Show Nav only if user is logged in */}
      {user && <Nav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
