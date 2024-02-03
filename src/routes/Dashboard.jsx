import Layout from '../components/Layout.jsx';

const Dashboard = ({ loggedIn, setLoggedIn, loggedInEmail }) => {
  return(
    <main className="Dashboard">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>

      <h2>Dashboard</h2>
      <p>Hello, {loggedInEmail}</p>
    </main>
  )
}

export default Dashboard;