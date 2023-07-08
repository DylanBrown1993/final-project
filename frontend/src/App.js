import React, { Component, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Review from './components/Review';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


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
          <Route path="/reviews" element={<Review/>}/>
        </Routes>
      </Router>
    );
}

export default App;
