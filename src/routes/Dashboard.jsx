import Layout from '../components/Layout.jsx';

const Dashboard = ({ loggedIn, setLoggedIn }) => {
  return(
    <main className="Dashboard">
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      </Layout>

      <h2>Dashboard</h2>
    </main>
  )
}

export default Dashboard;