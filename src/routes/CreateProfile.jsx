import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../components/Layout.jsx';

const CreateProfile = ({ loggedInEmail, setLoggedInEmail }) => {
  const navigate = useNavigate();

   
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState();
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("bio", bio);
    formData.append("email", loggedInEmail);

    //TODO: need to fix this post request, error 400, probably the photo part

    const postData = async () => {
      await axios.post(`/user/createProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      .then((response) => {
        console.log(response)
        const res =response.data
        if (response.status === 201) {
          setLoggedInEmail(email)
          navigate("/dashboard")
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

    postData();
    ;
  }
  
  return (
    <main className="CreateProfile">
      <Layout loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}>
      </Layout>
      
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          onChange={(e) => setName(e.target.value)}/>
          <br></br>
        <label htmlFor="photo">Profile photo: </label>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          onChange={(e) => setPhoto(e.target.value)}/>
          <br></br>
        <label htmlFor="bio">Bio: </label>
        <textarea 
          id="bio" 
          name="bio" 
          rows="4"
          cols="50"
          onChange={(e) => setBio(e.target.value)}/>
          <br></br><br></br>
          <button type="submit">Create Profile</button>
      </form>
    </main>
  )
}

export default CreateProfile;