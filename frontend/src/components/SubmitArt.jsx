import React, { useState } from "react";
// import '../styles/SubmitArt.css';
import axios from 'axios';

const SubmitArt = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState('');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      formData.append('user_id', userId);

      await axios.post('http://localhost:3001/submitart', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Art submitted successfully');
    } catch (error) {
      console.error('Error submitting art', error);
    } 
  };

  return (
    <form method="POST" action="/submitart" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label>
        Image:
        <input type="file" onChange={handleImageSelect}/>
      </label>
      <label>
        Username:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
      </label>
      <button type="submit">Submit</button>
    </form>
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