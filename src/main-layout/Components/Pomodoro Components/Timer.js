import React, {useEffect, useRef} from 'react'
import Block from './Block'

const Timer = ({timeLeft, setTimeLeft, isPaused, setIsPaused}) => {
    // timeleft is in seconds
    let minutes = Math.floor(timeLeft/60);
    let seconds = Math.floor(timeLeft-60*minutes);
    let intervalRef = useRef();

    useEffect(()=>{
        const id = setInterval(()=>{
            {isPaused?
                clearInterval(intervalRef.current):
                setTimeLeft(timeLeft-1)
            }
        }, 1000)
        intervalRef.current=id;
        return () => clearInterval(intervalRef.current);
    });

    return (
        <div>
            <div style={{display:'flex'}}>
                <Block param="Minutes" number={minutes} /><h1>:</h1><Block param="Seconds" number={seconds}/>
            </div>
            <button onClick={ ()=>{setTimeLeft(0); setIsPaused(true);} }>Reset</button>
        </div>
    )
}

export default Timer
