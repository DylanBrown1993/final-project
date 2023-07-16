import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Register = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    axios.post
    ('http://localhost:3001/register', {
      name, username, email, password
    })
    .then(function (response) {
      navigate("/login");
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return (
    <div className="auth-form-container">
      <h2 >Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label for="name">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full name" />
        <label for="username">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username" />
        <label for="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />

        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Register</button>
        &nbsp;
        {/* <button onClick={handleSubmit}>Register</button> */}
        <Link to= "/login" >Already have an account? Login</Link>
      </form>
    </div>
  );
};