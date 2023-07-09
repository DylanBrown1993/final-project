import React from 'react';
import '../styles/ColorJump.css';

const ColorJump = () => {
  return (
    <div>
      <div style={{ position: 'relative', height: 0, overflow: 'hidden', paddingBottom: '56.25%', marginLeft: 165, marginTop: 40 }}>
        <iframe id="embededGame" src="https://idev.games/embed/color-jump" scrolling="no" seamless="seamless" frameBorder="0" style={{ position: 'absolute', top: 0, left: 0, width: '80%', height: '80%' }}>Browser not compatible.</iframe>
      </div>
      <div className='game-info-container'>
        <h2 className='game-title'>Color Jump</h2>
        <p className='game-description'>
          Color Jump is an addictive and challenging infinite jumping game. 
          Jump over the platform of the same color to go to the next floor. Get more time by collecting the clock, don't miss it!
          The controls are simple: tap the left side to move the circle in the left direction or tap the right side to move the circle in the right direction.
          It is easy to play, but most people find it difficult to score high. 
          Try to see how high you can get.
        </p>
      </div>
    </div>
  );
};

export default ColorJump;
