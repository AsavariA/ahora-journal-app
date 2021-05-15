import React, {useState} from 'react'
import fire from '../../../services/fire'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { ToastContainer, toast } from 'react-toastify';

const AddNote = () => {
    const db=fire.firestore();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("to-do");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToDo = () => {
        const userEmail = JSON.parse (localStorage.getItem ('user')).email
        if (body !== "" || title !== ""){
                db.collection('Users')
                .doc(userEmail)
                .collection('Kanban')
                .add({
                    title,
                    body,
                    status,
                    time : new Date(),
                });      
                setTitle("");
                setBody("");
                setStatus("to-do")
            handleClose(); 
            }
         else{
             toast.error('Please fill one or both of the fields')
         }   
        };

    return (
        <div>
            <ToastContainer />
            <Button onClick={handleClickOpen}>
                Add Task
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            autoComplete="false"
                            fullWidth
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextField
                            multiline
                            rowsMax={4}
                            margin="dense"
                            id="name"
                            label="Content"
                            type="text"
                            autoComplete="false"
                            fullWidth
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup aria-label="status" name="status" value={status} onChange={e => setStatus(e.target.value)}>
                                <FormControlLabel value="to-do" control={<Radio />} label="To-do" />
                                <FormControlLabel value="in-progress" control={<Radio />} label="In Progress" />
                                <FormControlLabel value="done" control={<Radio />} label="Done" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                <DialogActions>
                <Button onClick={addToDo} color="primary">
                    Save
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddNote

