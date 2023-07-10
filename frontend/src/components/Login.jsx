import React, { useState } from "react";
import '../styles/LoginRegister.css'

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefualt();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2 >Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label form="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
        <label form="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Sign Up</button>
    </div>
  );
}