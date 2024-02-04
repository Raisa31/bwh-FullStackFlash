/* TODO */

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const Messages = ({ loggedInEmail, setLoggedInEmail }) => {
    return(
    <main>
      <Layout loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      <h2>Messages</h2>
    </main>
    )
}

export default Messages;