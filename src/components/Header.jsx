import { Outlet, Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, loggedInEmail, setLoggedInEmail }) => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    setLoggedInEmail("");
    navigate("/");
  }
  
  return (
    <div className="Header">
      <header>
        <h1>Title</h1>
        {loggedInEmail ? 
          <nav>
            <Link to="/">
              <button>HOME</button>
            </Link>
            <Link to="/profile">
              <button>PROFILE</button>
            </Link>
            <button onClick={handleLogout}>LOG OUT</button>
            <p>Logged in as {loggedInEmail}</p>
          </nav> : 
          
          <nav>
            <Link to="/">
              <button>HOME</button>
            </Link>
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
            <Link to="/register">
              <button>REGISTER</button>
            </Link>
          </nav>
        }
      </header>
      <Outlet />
    </div>
  )
}

export default Header;