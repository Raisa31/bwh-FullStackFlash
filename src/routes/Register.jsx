import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const Register = ({ loggedIn, setLoggedIn, setLoggedInEmail }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);


    const postData = async () => {
      await axios.post(`/app/signup`, formData)
      .then((response) => {
        console.log(response)
        const res =response.data
        if (response.status === 201) {
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

    postData();

    setLoggedIn(true);
    ;
  }
  
  return (
    <main className="Register">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>
      
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input 
          type="text" 
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
          <button type="submit">Sign Up</button>
      </form>
    </main>
  )
}

export default Register;