import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Home = ({ loggedIn, setLoggedIn }) => {
  
  return(
    <main className="Home">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>
      
      <h2>Home</h2>

    </main>
  )
}

export default Home;