import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/SubmitArt.css";
import axios from "axios";

const SubmitArt = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/submitart", {
        title,
        image,
      });
      navigate("/art");
    } catch (error) {
      console.error("Error submitting art", error);
    }
  };

  return (
    <div>
      <h1>Submit An Art Piece</h1>
      {!props.user ? (
        <form method="POST" action="/submitart" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to submit an art piece</p>
      )}
    </div>
  );
};

export default SubmitArt;

//////////
// state = {
//   selectedFill: null
// };

// onFileChange = event => {
//   this.setState({
//     selectedFile: event.target.files[0]
//   });
// };

// onFileUpload = () => {
//   const formDate = new FormData();

//   FormData.append(
//     "myFile",
//     this.state.selectedFile,
//   )
// }

////////

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios.post
//     ('http://localhost:3001/submitart', {
//       title, image, user_id
//     })
//     .then(function (response) {
//       props.setUser(response.data.user);
//       navigate("/");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   return (
//     <div className="auth-form-container">
//       <h2 >Login</h2>
//       <div className="login-form">
//         <label for="username">Username</label>
//         <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="yourusername" id="username" name="username" />
//         <label for="password">Password</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
//         <button onClick={handleSubmit}>Login</button>
//       </div>
//     </div>
//   );
