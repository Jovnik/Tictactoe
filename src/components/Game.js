import React, { useContext, useEffect } from 'react'
import Board from './Board';
import Scoreboard from './Scoreboard';
import History from './History';

import GameContext from '../context/game/gameContext';

const Game = () => {

    const gameContext = useContext(GameContext);

    const { player, determineWinner, winner, resetGame, newGame, changeGameState } = gameContext; 

    // after a game is reset, the newGame state becomes true, so we must set it back to false again
    useEffect(() => {
        if(newGame){
            console.log('herefirst?')
            changeGameState();
            // console.log('We change newGame back to false here')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newGame])

    // determine the winner every time the player state gets updated
    // this happens as soon as the app loads 
    useEffect(() => {
        // console.log('number of turns is', nTurns);
        determineWinner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player])    

    const handleClick = () => {
        resetGame();
    }

    return (
        <div className="game">
            <div className="score-board-area">
                <Scoreboard />
            </div>
            <div className="game-board">
                <Board />
                { winner && <button className="play-again" onClick={handleClick}>New Game</button> }
            </div>
            <div className="game-info">
                <History />
            </div>

        </div>
    )
}

export default Game;
