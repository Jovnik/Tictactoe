import React, { useContext } from 'react';

import GameContext from '../context/game/gameContext';

const Scoreboard = () => {
    const gameContext = useContext(GameContext);

    const { wins } = gameContext;

    return (
        <div className="scoreboard"> 
            <h2 style={{ textDecoration: 'underline' }}>Scoreboard</h2>
            <h3>X: {wins.X}</h3>
            <h3>O: {wins.O}</h3>
            <h3>Draw: {wins.draw}</h3>
        </div>
    )
}

export default Scoreboard;