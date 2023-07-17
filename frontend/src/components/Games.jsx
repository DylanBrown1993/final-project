import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Games.css';
import '../styles/Fonts.css';
import RunGameImage from '../../../src/images/RunGame.png';
import ColorJumpImage from '../../../src/images/ColorJump.png';


const Games = () => {
  return (
    <div className='background'>
      <h1 className='games-header'>Games</h1>
      <div className='games-list-container'>
        <Link to="/rungame">
          <img src={RunGameImage} alt="run-game-img" />
        </Link>
        <Link to="/colorjump">
          <img src={ColorJumpImage} alt="color-jump-img" />
        </Link>
      </div>
    </div>
  );
};

export default Games;