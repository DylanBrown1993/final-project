import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import '../styles/Navigation.css';

function Navigation() {

  const navRef = useRef();
  const showNavBar = () => navRef.current.classList.toggle('responsive_nav');

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
    </header>
  );
}

export default Navigation;


{/* <nav>
      <h1 className="nav--text">Ribbit</h1>
      <div className="nav--links">
        <button className="btn btn--login">Login</button>
        &nbsp;
        <button className="btn btn--signup">Sign Up</button>
      </div>
      <div className="nav--burgerlogo">
        <div className="nav--burger"></div>
          <ul className="burger-items">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/article">Article</a>
            </li>
            <li>
              <a href="/review">Review</a>
            </li>
            <li>
              <a href="/games">Games</a>
            </li>
          </ul>
      </div>
    </nav> */}