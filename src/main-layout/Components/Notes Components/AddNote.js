import React, {useState} from 'react'
import fire from '../../../services/fire'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import './Notes.css'

const AddNote = () => {
    const db=fire.firestore();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addNote = () => {
        const userEmail = JSON.parse (localStorage.getItem ('user')).email
        if (body !== "" || title !== ""){
                db.collection('Users')
                .doc(userEmail)
                .collection('Notes')
                .add({
                    title,
                    body,
                    time : new Date(),
                });      
                setTitle("");
                setBody("");
            handleClose(); 
            }
         else{
             toast.error('Please fill one or both of the fields')
         }   
        };

    return (
        <div>
            <ToastContainer />
            <button onClick={handleClickOpen}>
                Add Note
            </button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
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
                    label="Note Content"
                    type="text"
                    autoComplete="false"
                    fullWidth
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={addNote} color="primary">
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

