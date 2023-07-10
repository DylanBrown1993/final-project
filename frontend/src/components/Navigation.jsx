import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef, useState } from 'react';
import '../styles/Navigation.css';
import { Link } from "react-router-dom";

function Navigation() {

  const navRef = useRef();
  const showNavBar = () => navRef.current.classList.toggle('responsive_nav');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      <h3>Ribbit</h3>
      <nav ref={navRef}>
        <a href="/">Home</a>
        &nbsp;
        <a href="article">Article</a>
        &nbsp;
        <a href="review">Review</a>
        &nbsp;
        <a href="games">Games</a>

        <button className='nav-btn nav-close-btn' onClick={showNavBar}>
          <FaTimes/>
        </button>
      </nav>
      <button className='nav-btn' onClick={showNavBar}>
        <FaBars/>
      </button>
      {/* <Link to="/login">Login</Link>
      {isLoggedIn ? null : <Link to="/register">Register</Link>} */}
    </header>
  );
}

export default Navigation;