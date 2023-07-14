import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MainReview from './components/MainReviews';
import MainArticles from './components/MainArticles';
import Review from './components/Review';
import Article from './components/Article';
import Games from './components/Games';
import MainArt from './components/Art';
import ArtImage from './components/ArtImage'
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RunGame from './components/RunGame';
import ColorJump from './components/ColorJump';
import Forum from './components/Forum';
import ForumItemBody from './components/ForumItemBody';
import ForumComments from './components/ForumComments';

axios.defaults.withCredentials = true


function App() {

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:3001/users/info");
      console.log(res);
      setUser(res.data);
    };
    getUsers();
  }, []);

  const [currentForm, setCurrentForm] = useState("login");
  const [user, setUser] = useState(null);
  console.log("userlog", user);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  return (
    <div className="App">
      {/* {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } */}

      <Router>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<MainReview />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/articles" element={<MainArticles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/art" element={<MainArt />} />
          <Route path="/art/:id" element={<ArtImage />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/games" element={<Games />} />
          <Route path="/colorjump" element={<ColorJump />} />
          <Route path="/rungame" element={<RunGame />} />
          <Route path="/forum/:id" exact element={<ForumItemBody user={user} setUser={setUser}/>} />
          <Route path="/forum" exact element={<Forum user={user} setUser={setUser}/>} />
          <Route path="/forum/:id/:commentId" element={<ForumComments user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
