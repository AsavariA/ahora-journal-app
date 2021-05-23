import React from 'react'
import AddTodo from './AddTodo'
import fire from '../../../services/fire'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Column3 = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userEmail = JSON.parse (localStorage.getItem ('user')).email 
    const handleOnDelete = id => {
      fire
        .firestore()
        .collection('Users')
        .doc(userEmail)
        .collection('Kanban')
        .doc(id)
        .delete();
    };

    const handleOnUpdate = (id, status) => {
        fire
          .firestore()
          .collection('Users')
          .doc(userEmail)
          .collection('Kanban')
          .doc(id)
          .update(
              {
                  status: status
              }
          )
          setAnchorEl(null)
      };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <div className="column">
            <p style={{marginTop:'10px'}}>Done</p>
            <AddTodo />
            <div className="ListDiv">
            {props.DoneList.DoneList.map(list => {
                return (
                <div className="ListItemDiv" style={{display:'flex', justifyContent:'space-between',margin:'10px'}} >
                        <div>
                            <div className="ListTitleDiv">{list.title}</div>
                            <div className="ListItemDetailDiv">{list.body}</div>
                        </div>
                        <div>
                            <div className="ListItemDeleteButton" onClick={() => handleOnDelete(list.id)}>&#10006;</div>
                            <div className="ListItemDeleteButton" onClick={handleClick}>&#8942;</div>
                        </div>
                        <Menu
                            id="change-status"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={() => handleOnUpdate(list.id, 'to-do')}>To Do</MenuItem>
                            <MenuItem onClick={() => handleOnUpdate(list.id, 'in-progress')}>In Progress</MenuItem>
                        </Menu>
                </div>
                );
            })}
        </div>
        </div>
    )
}

export default Column3
