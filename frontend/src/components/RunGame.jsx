import React from 'react';
import '../styles/GamesPlayers.css';

const RunGame = () => {
  return (
    <div className='background'>
      <div style={{ position: 'relative', height: 0, overflow: 'hidden', paddingBottom: '56.25%', marginLeft: 165, }}>
        <iframe id="embededGame" src="https://idev.games/embed/run-game" scrolling="no" seamless="seamless" frameBorder="0" style={{ position: 'absolute', top: 0, left: 0, width: '80%', height: '75%' }}>Browser not compatible.</iframe>
      </div>
      <div className='game-info-container'>
        <div className='game-description'>
          <div className='game-title'>Run Game</div>
          Run Game is a simple platform where you control a running man! Dodge obstacles and collect items as you traverse through
          different levels and landscapes.
        </div>
      </div>
    </div>
  );
};

export default RunGame;
