import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/LoginRegister';
import NavBar from './components/Navbar';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Dad Jokes</h1>
        <Route path="/" component={NavBar} />
        <Route
          path="/login"
          render={props => <LoginRegister {...props} login />}
        />
        <Route
          path="/register"
          render={props => <LoginRegister {...props} />}
        />
                      <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default App;
