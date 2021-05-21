import React,{useState} from 'react'
import Form from './Pomodoro Components/Form'
import Timer from './Pomodoro Components/Timer'
import Finished from './Pomodoro Components/Finished'
import './Pomodoro Components/pomodoro_components.css'

function Pomodoro(){

    const [timeLeft, setTimeLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    return(
        <div className="pomodoro-main">
            <h2>Focus Timer</h2>
            <Form setTimeLeft={setTimeLeft} setIsPaused={setIsPaused}/>
            { timeLeft < 0 ? 
                <Finished 
                setTimeLeft={setTimeLeft} 
                setIsPaused={setIsPaused} 
                />:
                <Timer 
                    timeLeft={timeLeft} 
                    setTimeLeft={setTimeLeft} 
                    isPaused={isPaused} 
                    setIsPaused={setIsPaused} 
                />
                 
            }
        </div>
    )
}

export default Pomodoro