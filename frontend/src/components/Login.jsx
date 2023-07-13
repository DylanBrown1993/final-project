import React, { useState } from "react";
import '../styles/LoginRegister.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);

    

    axios.post
    ('http://localhost:3001/login', {
      username, password
    })
    .then(function (response) {
      console.log(response);
      props.setUser(response.data.user);
      navigate("/");
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <div className="auth-form-container">
      <h2 >Login</h2>
      <div className="login-form">
        <label for="username">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="yourusername" id="username" name="username" />
        <label for="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
        <button onClick={handleSubmit}>Login</button>
      </div>

      {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Sign Up</button> */}
      &nbsp;
      <Link to= "/register" >Don't have an account? Sign Up</Link>
    </div>
  );
}