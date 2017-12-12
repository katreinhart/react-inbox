import React, { Component } from 'react';
import './App.css';

import Header from './components/Header'
import MessageList from './components/MessageList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MessageList />
      </div>
    );
  }
}

export default App;
