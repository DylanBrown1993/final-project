import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef, useState } from 'react';
import '../styles/Navigation.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Navigation(props) {

  const navRef = useRef();
  const showNavBar = () => navRef.current.classList.toggle('responsive_nav');
  const navigate = useNavigate();
  const logoutUser = () => {

    axios.post
    ('http://localhost:3001/logout')
    
    .then(function (response) {
      console.log(response);
      props.setUser(null);
      navigate("/");
    })
    .catch(function (error) {
      console.log(error);
    }); 
  };
  


  return (
    <header>
      <h3>Ribbit</h3>
      <nav ref={navRef}>
        <a href="/">Home</a>
        &nbsp;
        <a href="/articles">Article</a>
        &nbsp;
        <a href="/reviews">Review</a>
        &nbsp;
        <a href="/games">Games</a>
        &nbsp;
        <a href="/art">Art</a>
        &nbsp;
        <a href="/forum">Forum</a>
        <button className='nav-btn nav-close-btn' onClick={showNavBar}>
          <FaTimes/>
        </button>
      </nav>
      <button className='nav-btn' onClick={showNavBar}>
        <FaBars/>
      </button>

      
      {props.user ? <div>{props.user.name} <button onClick={logoutUser}>Logout</button></div> : <Link to="/login">Login</Link>} 
      {props.user ? null : <Link to="/register">Register</Link>}
      
    </header>
  );
}

export default Navigation;