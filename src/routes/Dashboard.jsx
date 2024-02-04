import Layout from '../components/Layout.jsx';
import MessageUser from '../components/MessageUser.jsx';

const Dashboard = ({ loggedInEmail, setLoggedInEmail }) => {
  return(
    <main className="Dashboard">
      <Layout loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>

      <h2>Dashboard</h2>
      <p>Hello, {loggedInEmail}</p>
      <MessageUser loggedInEmail={loggedInEmail} />
      
    </main>
  )
}

export default Dashboard;