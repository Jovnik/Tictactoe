import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';

import {
    SWAP_PLAYER,
    UPDATE_BOARD,
    DETERMINE_WINNER,
    RESET_GAME,
    CHANGE_GAME_STATE,
    CHANGE_HISTORY,
    DISABLE_FIRST_TURN
} from '../types';

const GameState = props => {
    const initialState = {
        player: 'X',
        squares: Array(9).fill(null),
        winner: null,
        newGame: false,
        wins: {
            X: 0,
            O: 0,
            draw: 0
        },
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        firstTurn: true,
        nTurns: 0,
        gameFinished: false
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);

    // dont need firstTurn and newGame in this file
    const { player, squares, wins, history, nTurns, gameFinished } = state;

    //ACTIONS

    const switchPlayer = () => {
        const payload = {};
        payload.nextPlayer = player === 'X' ? 'O' : 'X';

        let numTurns = nTurns;
        payload.numTurns = numTurns+=1;

        dispatch({
            type: SWAP_PLAYER,
            payload,
            // nTurns: nTurns++
        })

    };

    const jumpTo = (move) => {

        const newPlayer = move%2 === 0 ? 'X' : 'O';

        const newHistory = history.slice(0, move+1);
        console.log('This is the new history', newHistory);

        dispatch({
            type: CHANGE_HISTORY,
            payload: { newPlayer, revertedSquares: history[move].squares, move, newHistory }
        })
    }

    const updateInternalBoard = (squareNum) => {
        
        const newSquares = squares.map((square, index) => index === squareNum ? state.player : square);
        
        dispatch({
            type: UPDATE_BOARD,
            payload: { squares: newSquares, squareNum }
        })
        // console.log(history);
    }

    const resetGame = () => {
        dispatch({
            type: RESET_GAME
        })
    }

    const changeGameState = () => {
        console.log('We got to change game state')
        dispatch({
            type: CHANGE_GAME_STATE
        })
    }

    const disableFirstTurn = () => {
        dispatch({
            type: DISABLE_FIRST_TURN
        })
    }

    const determineWinner = () => {
        // console.log('we try to determine the winner');
        // console.log(squares);
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // this checks if there is an actual winner
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            // this if statement is what determines if there is a winner
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              const updatedWins = { ...wins };
              updatedWins[squares[a]]++;
              console.log('The updated win is', updatedWins);
              dispatch({
                  type: DETERMINE_WINNER,
                  payload: { winner: squares[a], updatedWins }
              })

              // this loops gets hit from the very start when everything is null
            } else if (!gameFinished && nTurns === 9 && !squares.every(e => e === null)){
                console.log('We enter the draw loop');
                console.log('nturns is ', nTurns)
                const updatedWins = { ...wins };
                updatedWins.draw++;
                dispatch({
                    type: DETERMINE_WINNER,
                    payload: { winner: 'draw', updatedWins, gameFinished: true }
                })
            }
        }
    }

    return (
        <GameContext.Provider
        value={{
            player: state.player,
            squares: state.squares,
            winner: state.winner,
            newGame: state.newGame,
            wins: state.wins,
            history: state.history,
            stepNumber: state.stepNumber,
            firstTurn: state.firstTurn,
            nTurns: state.nTurns,
            gameFinished: state.gameFinished,
            switchPlayer,
            updateInternalBoard,
            determineWinner,
            resetGame,
            changeGameState,
            jumpTo,
            disableFirstTurn
        }}>
            { props.children }
        </GameContext.Provider>
    );
};

export default GameState;