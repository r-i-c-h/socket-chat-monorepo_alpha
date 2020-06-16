import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Welcome from './components/Welcome/Welcome';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Welcome} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default App;