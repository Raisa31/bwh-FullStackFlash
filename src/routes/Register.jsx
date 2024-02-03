import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Register = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/dashboard");
  }
  
  return (
    <main className="Register">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>
      
      <h2>Register</h2>
      <form>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username"></input><br></br>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password"></input><br></br>
        <label htmlFor="firstname">First name: </label>
        <input type="text" id="firstname" name="firstname"></input><br></br>
        <label htmlFor="birthdate">Birthdate: </label>
        <input type="date" id="birthdate" name="birthdate"></input><br></br><br></br>
        <button type="submit" onClick={handleLogin}>Register</button>
      </form>
    </main>
  )
}

export default Register;