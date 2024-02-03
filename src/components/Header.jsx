import { Outlet, Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, setLoggedIn }) => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  }
  
  return (
    <div className="Header">
      <header>
        <h1>Title</h1>
        {loggedIn ? 
          <nav>
            <Link to="/">
              <button>HOME</button>
            </Link>
            <button onClick={handleLogout}>LOG OUT</button>
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