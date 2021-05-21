import React from 'react';
import Scheduler from './Big Calendar Components/scheduler';
import './Big Calendar Components/cal.css';
import Button from '@material-ui/core/Button';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';


class Cal extends React.Component {
    state = {
        messages: []
    };
    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [
            newMessage,
            ...this.state.messages
        ];

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
        const { messages } = this.state;
        return (
            <div className='scheduler-main' style={{overflowX: 'clip'}}>
                <div className='responsive' style={{backgroundColor: 'white', position: 'absolute', zIndex:'5000', width:'100vw', height:'100%'}}>
                    <p>Oops! Sorry, We are currently not available on mobile. Please use a Desktop!</p>
                </div>
                <div className='taskbar'>
                    <Button aria-controls="simple-menu" aria-haspopup="true" >Help</Button>
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

export default Cal;
