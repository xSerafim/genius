import React from 'react';
import Game from './pages/Game';
import GeniusProvider from './context/GeniusProvider';
import './App.css'

function App() {

  return (
    <GeniusProvider>
      <Game />
    </GeniusProvider>
  )
}

export default App
