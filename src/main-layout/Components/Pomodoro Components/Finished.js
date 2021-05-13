import React from 'react'
import Confetti from 'react-confetti'
// import useSound from 'use-sound'

const Finished = ({setTimeLeft, setIsPaused}) => {

    let width=window.innerWidth;

    return (
        <div>
            <Confetti width={width}/>
            <h2>Congratulations! You finished your Pomodoro!</h2>
            <button onClick={ ()=>{setTimeLeft(0); setIsPaused(true);} }>Reset</button>
        </div>
    )
}

export default Finished
