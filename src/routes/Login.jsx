import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Login = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/dashboard");
  }

  return (
    <main className="Login">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>
      
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username"></input><br></br>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password"></input><br></br><br></br>
          <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </main>
  )
}

export default Login;