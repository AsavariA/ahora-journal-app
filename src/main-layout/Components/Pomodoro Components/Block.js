import React from 'react'
import './pomodoro_components.css'

const Block = ({number}) => {
    return (
        <div className="block">
            <h1>{number}</h1>
        </div>
    )
}

export default Block
