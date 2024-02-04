import { Outlet, Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import blackcircle from "../images/blackcircle.png";

const Header = ({ loggedIn, loggedInEmail, setLoggedInEmail }) => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    setLoggedInEmail("");
    navigate("/");
  }
  
  return (
    <div className="Header">
      <header>
        <div className="titleWrapper">
          <img src={logo} className="logoImg"/>
          <h1>SkillSages</h1>
        </div>
        <div className="blackCircleWrapper">
          <img src={blackcircle} className="blackcircle" />
        </div>
        
        {loggedInEmail ? 
          <nav>
            <Link to="/">
              <button>HOME</button>
            </Link>
            <Link to="/messages">
              <button>MESSAGES</button>
            </Link>
            <Link to="/profile">
              <button>PROFILE</button>
            </Link>
            <button onClick={handleLogout}>LOG OUT</button>
            <p>Logged in as {loggedInEmail}</p>
          </nav> : 
          
          <nav>
            <Link to="/">
              <button className="homeButton">Home</button>
            </Link>
            <Link to="/login">
              <button className="loginButton">Login</button>
            </Link>
            <Link to="/register">
              <button className="registerButton">Sign Up</button>
            </Link>
          </nav>
        }
      </header>
      <Outlet />
    </div>
  )
}

export default Header;