import React, { useContext } from 'react';

import GameContext from '../context/game/gameContext';


const History = () => {

    const gameContext = useContext(GameContext);

    const { history, jumpTo } = gameContext;

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button className="prev-move" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div>
            <h2>Move History</h2>
            <ol>{moves}</ol>

        </div>
    )
}

export default History;
