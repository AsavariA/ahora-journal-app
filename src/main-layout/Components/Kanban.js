import React from 'react'
import Column1 from './Kanban Components/Column1'
import Column2 from './Kanban Components/Column2'
import Column3 from './Kanban Components/Column3'
import './Kanban Components/Kanban.css'

function Kanban(){
    return(
        <div style={{display:'flex', padding:'1rem 0.5rem'}}>
            <Column1 />
            <Column2 />
            <Column3 />
        </div>
    )
}

export default Kanban