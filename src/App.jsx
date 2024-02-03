import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Home from './routes/Home.jsx';
import Dashboard from './routes/Dashboard.jsx';
import CreateProfile from './routes/CreateProfile.jsx';
import GetProfile from './routes/GetProfile.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");

  return (
    <Routes>
      <Route element={<Home loggedIn={loggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail} />} path="/" />
      <Route element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} path="/login" />
      <Route element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} path="/register" />
      <Route element={<Dashboard loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} path="/dashboard" />
      <Route element={<CreateProfile loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} path="/createprofile" />
      <Route element={<GetProfile loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} path="/profile" />
    </Routes>
  )
}

export default App;
