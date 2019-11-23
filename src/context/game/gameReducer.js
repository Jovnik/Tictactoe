import {
    SWAP_PLAYER,
    UPDATE_BOARD,
    DETERMINE_WINNER,
    RESET_GAME,
    CHANGE_GAME_STATE,
    CHANGE_HISTORY,
    DISABLE_FIRST_TURN
} from '../types';

export default (state, action) => {
    switch(action.type){
        case SWAP_PLAYER:
            return {
                ...state,
                player: action.payload.nextPlayer,
                nTurns: action.payload.numTurns
            }
        case UPDATE_BOARD:
            return {
                ...state,
                squares: state.squares.map((square, index) => index === action.payload.squareNum ? state.player : square),
                history: state.history.concat([{squares: action.payload.squares}])
            }
        case DETERMINE_WINNER:
            return {
                ...state,
                winner: action.payload.winner,
                wins: action.payload.updatedWins,
                gameFinished: true
            }
        case RESET_GAME:
            return {
                ...state,
                player: 'X',
                squares: Array(9).fill(null),
                winner: null,
                newGame: true,
                history: [{squares: Array(9).fill(null)}],
                firstTurn: true,
                nTurns: 0,
                gameFinished: false
            }
        case CHANGE_GAME_STATE:
            return {
                ...state,
                newGame: false
            }
        case CHANGE_HISTORY:
            return {
                ...state,
                player: action.payload.newPlayer,
                squares: action.payload.revertedSquares,
                stepNumber: action.payload.move,
                history: action.payload.newHistory
                // squares: state.history[action.payload + 1]
            }
        case DISABLE_FIRST_TURN:
            return {
                ...state,
                firstTurn: false
            }
        default:
            return state;
    }
}