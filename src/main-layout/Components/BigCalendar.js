import React from 'react';
import Scheduler from './Big Calendar Components/scheduler';
import './Big Calendar Components/cal.css';
import Button from '@material-ui/core/Button';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

//function AlertDailog() {
//    const [open, setOpen] = React.useState(false);

//    const handleClickopen = () => {
//        setOpen(true);
//    };
//    const handleClose = () => {
//        setOpen(false);
//    };
//}

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogText: {
        color: theme.palette.blue
    }
});

class Cal extends React.Component {
    //state = {
    //    messages: []
    //};
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        /*this.handleDialogOK = this.handleDialogOK.bind(this);*/
        this.state = {
            dialogText: 'To create an event, double click on the desired date.To increase/decresase the time span of the event in day or month view, pull the event box.',
            isDialogOpen: false,
            isChecked: false,
            messages: []
        }
    }

    //handleDailogOK() {
    //    console.log('clicked ok');
    //    this.setState({ isDialogOpen: false });
    //}

    handleDialogClose() {
        this.setState({ isDialogOpen: false });
    }

    handleChange(e) {
        const target = e.target;
        const value = target.checked;
        this.setState({
            isChecked: value,
            isDialogOpen: true
        }, () => { console.log('open dialog') });
    }

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = this.state.messages;

        messages.push(newMessage);

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? `(${ev.text})` : '';
        const message = `event ${action}: ${id} ${text}`;
        this.addMessage(message);
    }

    render() {
        /*const { messages } = this.state;*/
        const { classes } = this.props;
        return (
            <div className='scheduler-main' style={{overflowX: 'clip'}}>
                <div className='responsive' style={{backgroundColor: 'white', position: 'absolute', zIndex:'5000', width:'100vw', height:'100%'}}>
                    <p>Oops! Sorry, We are currently not available on mobile. Please use a Desktop!</p>
                </div>
                <div className='taskbar'>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleChange} checked={this.state.isChecked} >Help</Button>
                    <Dialog
                        open={this.state.isDialogOpen}
                        onClose={this.handleDialogClose}
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
                                {this.state.dialogText}
                            </DialogContentText>                            
                            <DialogActions>
                                <Button color="primary" onClick={this.handleDialogClose}>Okay</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    <Button aria-controls="simple-menu" aria-haspopup="true" ><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Back</Link></Button>
                </div>
                <div className='scheduler-container'>
                    <Scheduler
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
               
            </div>
        );
    }
}

export default withStyles(styles, { withTheme:true }) (Cal);
