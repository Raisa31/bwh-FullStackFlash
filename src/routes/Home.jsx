import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import CategoriesList from '../components/CategoriesList.jsx';

const Home = ({ loggedInEmail, setLoggedInEmail }) => {
  
  return(
    <main className="Home">
      <Layout loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      
      <p className="tagline">Bridging the generational divide to connect the wisdom of the elderly with the curiosity of youth to foster real connections beyond the screen.</p>
      <CategoriesList />

    </main>
  )
}

export default Home;