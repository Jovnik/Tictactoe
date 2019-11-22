import React, { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';

import {
    SWAP_PLAYER,
    UPDATE_BOARD,
    DETERMINE_WINNER,
    RESET_GAME,
    CHANGE_GAME_STATE,
    CHANGE_HISTORY
} from '../types';

const GameState = props => {
    const initialState = {
        player: 'X',
        squares: Array(9).fill(null),
        winner: null,
        newGame: false,
        wins: {
            X: 0,
            O: 0
        },
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);

    const { player, squares, wins, history } = state;

    //ACTIONS

    const switchPlayer = () => {
        if(player === 'X'){
            dispatch({
                type: SWAP_PLAYER,
                payload: 'O'
            })
        } else {
            dispatch({
                type: SWAP_PLAYER,
                payload: 'X'
            })
        }
    };

    const jumpTo = (move) => {
        console.log('We are jumping to move', move);
        console.log('Squares', squares);
        console.log('History', history);
        console.log('Going to', history[move].squares);

        // set the correct course of history here

        const newPlayer = move%2 === 0 ? 'X' : 'O';


        const newHistory = history.slice(0, move+1);
        console.log('This is the new history', newHistory);
        // slice to get the new history
        // const newHistory = history.slice(0, move);

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

    const determineWinner = () => {
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

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            //   console.log('something happened here!');
              const updatedWins = { ...wins };
              updatedWins[squares[a]]++;
              console.log('The updated win is', updatedWins);
              dispatch({
                  type: DETERMINE_WINNER,
                  payload: { winner: squares[a], updatedWins }
              })
            }
        }
        // return null;    //dont think i even need this

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
            switchPlayer,
            updateInternalBoard,
            determineWinner,
            resetGame,
            changeGameState,
            jumpTo
        }}>
            { props.children }
        </GameContext.Provider>
    );
};

export default GameState;