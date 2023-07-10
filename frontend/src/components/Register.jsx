import React, {useState} from "react";

export const Register = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2 >Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label form="name">Full Name</label>
        <input value={name} id="name" placeholder="full name" />
        <label form="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label form="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)}type="email" placeholder="*******" id="password" name="password" />
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Login</button>
      </form>
    </div>
  );
}