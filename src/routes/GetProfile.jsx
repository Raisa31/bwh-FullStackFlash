import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const GetProfile = ({ loggedInEmail, setLoggedInEmail}) => {
  const [profile, setProfile] = useState();
  
  //TODO: error 404, does data only get returned if all params present?
  useEffect(() => {
    
    const getData = async () => {
      await axios.get(`/user/getProfile/${loggedInEmail}`)
      .then((response) => {
        console.log(response)
        const res =response.data
        console.log(res);
        if (response.status === 200) {
          setProfile(res)
        } else {

        }
        })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)

          }
      })}

    getData();
    ;
  })


  return (
    <main>
      <Layout loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      <h2>My Profile</h2>
    </main>
  )
}

export default GetProfile;