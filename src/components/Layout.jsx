import { Helmet } from 'react-helmet-async';
import Header from './Header.jsx';

const Layout = ({ children, loggedIn, loggedInEmail, setLoggedInEmail }) => {
  return(
    <div className="Layout">
      <Header loggedIn={loggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail} />
      {children}
    </div>
  )
}

export default Layout;