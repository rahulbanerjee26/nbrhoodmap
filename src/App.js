import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
import {GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
          <span>
            <img src={logo} id="logo"alt="React logo"/>
            <h1> NeigbourHood Hotels </h1>
          </span>
          </header>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA07D7ZAMRMHYhAi0SOMkh3DwKO4c5fpP8'
})(App)
