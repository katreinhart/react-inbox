import React, { Component } from 'react'
import { Provider } from 'react-redux'

import './App.css';

import Inbox from './components/Inbox'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Inbox />
      </Provider>
    );
  }
}

export default App;
