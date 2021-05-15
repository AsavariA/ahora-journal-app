import React, { useState, useEffect } from "react";
import fire from '../../../services/fire';
import './Notes.css'

function useLists() {
    const [lists, setLists] = useState([]);
    const userEmail = JSON.parse (localStorage.getItem ('user')).email
  
    useEffect(() => {
      fire
        .firestore()
        .collection('Users')
        .doc(userEmail)
        .collection('Notes')
        .orderBy('time')
        .onSnapshot(snapshot => {
          const lists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setLists(lists);
          console.log(lists);
        });
    }, []);
  
    return lists;
  }

const NoteList = () => {

    const lists = useLists();
    const userEmail = JSON.parse (localStorage.getItem ('user')).email
    const handleOnDelete = id => {
      fire
        .firestore()
        .collection('Users')
        .doc(userEmail)
        .collection('Notes')
        .doc(id)
        .delete();
    };

    return (
      <div>
        <div className="ListDiv">
            {lists.map(list => {
                return (
                <div className="ListItemDiv" style={{display:'flex', justifyContent:'space-between'}} >
                        <div>
                            <div className="ListTitleDiv">{list.title}</div>
                            <div className="ListItemDetailDiv">{list.body}</div>
                        </div>
                        <div className="ListItemDeleteButton" onClick={() => handleOnDelete(list.id)}>&#10006;</div>
                </div>
                );
            })}
        </div>
      </div>
    )
}

export default NoteList
