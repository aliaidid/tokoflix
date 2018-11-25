import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './component/header.js'
import Home from './component/home.js'
import MovieDetails from './component/movieDetail.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Route exact path="/" component = {Home}/>
        <Route path="/MovieDetails" component={MovieDetails}/>
      </div>
    );
  }
}

export default App;
