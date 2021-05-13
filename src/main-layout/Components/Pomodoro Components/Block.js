import React from 'react'

const Block = ({param, number}) => {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>{number}</h1>
            <h2>{param}</h2>
        </div>
    )
}

export default Block
