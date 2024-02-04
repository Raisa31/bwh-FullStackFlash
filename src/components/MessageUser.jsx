/* TODO */


import axios from "axios";
import SendMessage from "../routes/SendMessage";
import { useNavigate } from "react-router-dom";

const MessageUser = ({ loggedInEmail }) => {
    const navigate = useNavigate();
    //temporary placeholder
    const userTwo = "a@gmail.com";

    const handleMessage = () => {
        const formData = new FormData();
        formData.append("userOne", loggedInEmail);
        formData.append("userTwo", userTwo);
        console.log(userTwo);

        const postData = async () => {
         await axios.post(`/messages/createConversation`, formData)
        .then((response) => {
        console.log(response)
        const res =response.data

        if (response.status === 201) {
            navigate("/sendmessage", {receiver: userTwo});
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

    return(
        <div className="MessageUser">
            <h3>Bob Smith</h3>
            <button onClick={handleMessage}>Message</button>
        </div>
        
    )
}

export default MessageUser;