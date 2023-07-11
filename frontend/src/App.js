import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MainReview from './components/MainReviews';
import MainArticles from './components/MainArticles';
import Review from './components/Review';
import Article from './components/Article';
import Games from './components/Games'
import MainArt from './components/Art'
import Home from './components/Home';
import ColorJump from './components/ColorJump';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RunGame from './components/RunGame';


function App () {
  // make it into a separate file later
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:3001/users");
      console.log(res);
    };
    getUsers();
  }, []);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/reviews" element={<MainReview/>}/>
          <Route path="/review/:id" element={<Review/>}/>
          <Route path="/articles" element={<MainArticles/>}/>
          <Route path="/article/:id" element={<Article/>}/>
          <Route path="/art" element={<MainArt/>}/>
          <Route path="/reviews" element={<Review/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/colorjump" element={<ColorJump/>}/>
          <Route path="/rungame" element={<RunGame/>}/>
        </Routes>
      </Router>
    );
}

export default App;
