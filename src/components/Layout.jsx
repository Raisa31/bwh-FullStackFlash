import { Helmet } from 'react-helmet-async';
import Header from './Header.jsx';

const Layout = ({ children, loggedIn, setLoggedIn }) => {
  return(
    <div className="Layout">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {children}
    </div>
  )
}

export default Layout;