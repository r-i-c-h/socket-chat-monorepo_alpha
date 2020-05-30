import React from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Route path="/" exact="true" component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default App;