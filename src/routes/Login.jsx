import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const Login = ({ loggedIn, setLoggedIn, loggedInEmail, setLoggedInEmail}) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      await axios.get(`/app/login/${email}/${password}`)
      .then((response) => {
        console.log(response)
        const res =response.data
        if (response.status === 200) {
          setLoggedInEmail(email)
          navigate("/dashboard")
        } else {
          setMessage("Invalid credentials")
        }
        })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          setMessage(error.response.data.error);
          }
      })}

    getData();

    setLoggedIn(true);
    ;
  }


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

export default Login;