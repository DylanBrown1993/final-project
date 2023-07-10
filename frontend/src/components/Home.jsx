import React from 'react';
import Navigation from './Navigation';

const Home = () => {
  return (
    <div className='home-container'>
      <Navigation/>
      <div className='home-banner-content'>

      </div>
      <div className='home-text-section'>
        <h1 className='primary-heading'>
          Welcome to Ribbit
        </h1>
        <p className='home-text'>
          Home of the best gaming reviews and articles.
        </p>
        </div>
    </div>
  );
};

export default Home;