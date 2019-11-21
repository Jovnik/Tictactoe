import React from 'react';
import './App.css';
import Game from'./components/Game';
import GameState from './context/game/GameState';

function App() {
  return (
    <GameState>
      <Game />
    </GameState>
  );
}

export default App;
