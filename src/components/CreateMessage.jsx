/* TODO */




import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateMessage = ({ sender, receiver }) => {
  
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      await axios.get(`/app/login/${email}/${password}`)
      .then((response) => {
        console.log(response)
        const res =response.data

        if (true) {
          
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
  }
    return (
    <div className="CreateMessage">
      
      <h2>Send a Message</h2>
    
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message: </label>
        <input 
          type="text" 
          id="message" 
          name="message" 
          onChange={(e) => setMessage(e.target.value)}/>
          <br></br>
        
          <button type="submit">Send</button>
      </form>
    </div>
    )
}

export default CreateMessage;