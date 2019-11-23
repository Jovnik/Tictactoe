import React, { useState, useContext, useEffect } from 'react';

import GameContext from '../context/game/gameContext';


const Square = ({ squareNumber }) => {
    const gameContext = useContext(GameContext);

    // removed history, disableFirstTurn and firstTurn from the destructure 
    const { switchPlayer, updateInternalBoard, winner, squares, newGame } = gameContext;

    //component level state
    // const [value, setValue] = useState(null);   
    const [clicked, setClicked] = useState(false);

    // this works for now but is pretty hacky in my opinion
    useEffect(() => {
        if(newGame){
            // setValue(null);
            setClicked(false);
        }
        // changeGameState();  //this changes the newGame state back to false 
    }, [newGame])   //this only occurs because the newGame state change is invoked, even though it is the same value??


    //if the square has been clicked and it doesnt have a value in it, then set the click state to be false again
    useEffect(() => {
        if(clicked && (squares[squareNumber] === null)){
            setClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [squares])

    
    const onClick = () => {

        if(clicked){
            console.log(`Square ${squareNumber} has already been clicked`)
        } else if (winner) {
            console.log('A winner has already been declared');  
        } else {
            updateInternalBoard(squareNumber);
            switchPlayer();
            setClicked(true);
        }
    }

    const classname = "square";
    return (
        // add the relevant classnames here to change the way your grid looks
        <button className={classname} onClick={onClick}>
            {squares[squareNumber]}
        </button>
    )
};

export default Square;
