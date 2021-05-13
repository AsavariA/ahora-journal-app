import React from 'react'
import Confetti from 'react-confetti'
import './pomodoro_components.css'
// import useSound from 'use-sound'

const Finished = ({setTimeLeft, setIsPaused}) => {

    let width=window.innerWidth;

    return (
        <div className="finish">
            <Confetti width={width} gravity={0.2}/>
            <p>Congratulations! You finished your Pomodoro!</p>
            <button className="reset" onClick={ ()=>{setTimeLeft(0); setIsPaused(true);} }>Reset</button>
        </div>
    )
}

export default Finished
