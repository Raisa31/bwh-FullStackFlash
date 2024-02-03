import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <header>
        <h1>Title</h1>
        <nav>
          <Link to="/">
            <button>HOME</button>
          </Link>
          <Link to="/login">
            <button>LOG IN</button>
          </Link>
          <Link to="/register">
            <button>REGISTER</button>
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Nav;