import React, { Component } from 'react';
import Player from './components/Player';
import glamorous from 'glamorous'

import './App.css';

const AppShell = glamorous.section({
  width: 700,
  maxWidth: '100%',
  margin: '0 auto',
  marginBottom: 15
});

class App extends Component {  
  render() {
    let Child = <Player />;
    return (
      <AppShell>{Child}</AppShell>
    );
  }
}

export default App;
