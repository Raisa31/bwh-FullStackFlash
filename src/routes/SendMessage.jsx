/* TODO */


import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const SendMessage = ({ loggedInEmail, userTwo }) => {
  const navigate = useNavigate();
  const receiver = useParams();
  
  return (
    <main className="Login">
      <Layout loggedIn={loggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      
      <h2>Login</h2>
      {message ? <p className="errorMessage">{message}</p> : <div></div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          onChange={(e) => setEmail(e.target.value)}/>
          <br></br>
        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          onChange={(e) => setPassword(e.target.value)}/>
          <br></br><br></br>
          <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default SendMessage;