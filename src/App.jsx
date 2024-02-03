import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Home from './routes/Home.jsx';
import Dashboard from './routes/Dashboard.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} path="/" />
      <Route element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} path="/login" />
      <Route element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} path="/register" />
      <Route element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} path="/dashboard" />
    </Routes>
  )
}

export default App;
