import React from 'react';
import { useRef } from 'react';
import '../styles/Navigation.css';
import logoImage from '../../../src/images/TitleNav.png';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navigation(props) {
  const navRef = useRef();
  const navigate = useNavigate();

  const logoutUser = () => {
    axios
      .post('http://localhost:3001/logout')
      .then(function (response) {
        console.log(response);
        props.setUser(null);
        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <header className="nav-header">
      <Link to="/" className="logo-link">
        <img src={logoImage} alt="Ribbit" className="logo" />
      </Link>
      <nav className="navbar-links" ref={navRef}>
      <NavLink
        to="/articles"
        activeclasscame="active"
        className="nav-link-1">
        Articles
      </NavLink>
      <NavLink to="/reviews" activeclassname="active" className="nav-link-2">
        Reviews
      </NavLink>
      <NavLink to="/games" activeclassname="active" className="nav-link-3">
        Games
      </NavLink>
      <NavLink to="/art" activeclassname="active" className="nav-link-4">
        Art
      </NavLink>
      <NavLink to="/forum" activeclassname="active" className="nav-link-5">
        Forum
      </NavLink>
    </nav>
      {props.user ? (
        <div className='user-text'>
          {props.user.name}{' '}
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      ) : (
        <div className="button-container">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navigation;
