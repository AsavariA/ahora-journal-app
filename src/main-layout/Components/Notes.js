import React from 'react'
import AddNote from './Notes Components/AddNote'
import NoteList from './Notes Components/NoteList'
import './Notes Components/Notes.css'

function Notes(){
    return(
        <div className="notes-main">
            <AddNote />
            <NoteList />
        </div>
    )
}

export default Notes