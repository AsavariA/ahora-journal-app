//import Board from './components/Boards';
//import Card from './components/card';
import React, { Component, useState, useEffect } from 'react';
import Scheduler from './components/scheduler';
// eslint-disable-next-line 
import './cal.css';
import fire from '../../services/fire'
import MessageArea from './components/MessageArea';



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
            <div>
                <div className='scheduler-container'>
                    <Scheduler
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
                <MessageArea
                    messages={messages}
                />
            </div>
        );
    }
}

export default Cal;
