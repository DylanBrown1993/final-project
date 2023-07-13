import React from 'react';
import { useRef } from 'react';
import '../styles/Navigation.css';
import logoImage from '../../../src/images/TitleNav.png';
import ButtonImage from '../../../src/images/LilyButton.png';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navigation(props) {
  const navRef = useRef();
  const showNavBar = () => navRef.current.classList.toggle('responsive_nav');
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
    <header>
      <Link to="/" className="logo-link">
        <img src={logoImage} alt="Ribbit" className="logo" />
      </Link>
      <nav className="navbar-links" ref={navRef}>
        <NavLink
          exact
          to="/articles"
          activeClassName="active"
          className="nav-link"
        >
          Articles
        </NavLink>
        <NavLink to="/reviews" activeClassName="active" className="nav-link">
          Reviews
        </NavLink>
        <NavLink to="/games" activeClassName="active" className="nav-link">
          Games
        </NavLink>
        <NavLink to="/art" activeClassName="active" className="nav-link">
          Art
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
