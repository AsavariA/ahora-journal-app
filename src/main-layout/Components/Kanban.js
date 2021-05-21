import React, {useState, useEffect} from 'react'
import Column1 from './Kanban Components/Column1'
import Column2 from './Kanban Components/Column2'
import Column3 from './Kanban Components/Column3'
import './Kanban Components/Kanban.css'
import fire from '../../services/fire'

function useLists() {
    const [lists, setLists] = useState([]);
    const userEmail = JSON.parse (localStorage.getItem ('user')).email
  
    useEffect(() => {
      fire
        .firestore()
        .collection('Users')
        .doc(userEmail)
        .collection('Kanban')
        .orderBy('time')
        .onSnapshot(snapshot => {
          const lists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setLists(lists);
        });
        // eslint-disable-next-line
    }, []);
    // return lists;
    var list1 = [];
    var list2 = [];
    var list3 = [];

    for (var i = 0; i < lists.length; i++) {
        if (lists[i].status === 'to-do'){
            list1.push(lists[i])
        } else if (lists[i].status === 'in-progress'){
            list2.push(lists[i])
        } else {
            list3.push(lists[i])
        }
    }
    return [list1, list2, list3]
  }

const Kanban = () =>{
    const [ToDoList, InProgressList, DoneList] = useLists();

    return(
        <div style={{display:'flex', padding:'1rem 0.5rem'}}>
            <Column1 ToDoList={{ToDoList}}/>
            <Column2 InProgressList={{InProgressList}} />
            <Column3 DoneList={{DoneList}} />
        </div>
    )
}

export default Kanban