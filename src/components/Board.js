import React, { useContext } from 'react'
import Square from './Square'

import GameContext from '../context/game/gameContext';

const Board = () => {
    const gameContext = useContext(GameContext);

    const { player, winner, squares } = gameContext;

    const renderSquare = (i) => {
        return <Square squareNumber={i} />
    }

    // console.log('//// this is the squares value', squares);

    return (
        <div>
            { winner ? <div className="status">The winner is {winner}!</div> : <div className="status">Next Player: {player}</div> }
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div> 
    )
}

export default Board