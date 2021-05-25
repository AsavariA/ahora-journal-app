import React from 'react'
import AddNote from './Notes Components/AddNote'
import NoteList from './Notes Components/NoteList'
import './Notes Components/Notes.css'

function Notes(){
    return(
        <div className="notes-main" style={{border: '2px solid black'}}>
            <AddNote />
            <NoteList />
        </div>
    )
}

export default Notes