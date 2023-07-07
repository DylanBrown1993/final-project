import React, { Component } from 'react';
// import {Route} from 'react-router-dom';
{/* <Route exact path='/reviews' component={Review} /> */}
import './App.css';
import Review from './components/Review';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/reviews">Reviews</Link>
        <Review></Review>
        <Route path="/review" component={Review}/
      </div>
    );
  }
}

export default App;
