import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Home = ({ loggedIn, loggedInEmail, setLoggedInEmail }) => {
  
  return(
    <main className="Home">
      <Layout loggedIn={loggedIn} loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      
      <h2>Home</h2>

    </main>
  )
}

export default Home;