import React,{useState} from 'react'
import Form from './Pomodoro Components/Form'
import Timer from './Pomodoro Components/Timer'
import Finished from './Pomodoro Components/Finished'
// import Block from './Pomodoro Components/Block'

function Pomodoro(){

    const [timeLeft, setTimeLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    return(
        <div>
            <h2>Pomodoro</h2>
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