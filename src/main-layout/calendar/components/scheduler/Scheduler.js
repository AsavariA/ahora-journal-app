/* eslint-disable */
/*{ { src / components / Scheduler / Scheduler.js } }*/
import React, { useState, useEffect, Component } from 'react'
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import './Scheduler.css';

const scheduler = window.scheduler;


export default class Scheduler extends Component {

    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }
        //const [event, onDataUpdated] = React.useState(localStorage.getItem('event') || '');

        //React.useEffect(() => {
        //    localStorage.setItem('event', event);
        //}, [event]
        //);
        //onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('created', ev, id);
            }
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('updated', ev, id);
            }
        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('deleted', ev, id);
            }
        });
        scheduler._$initialized = true;

    }

    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];

        this.initSchedulerEvents();

        const { events } = this.props;
        scheduler.init(this.schedulerContainer, Date.now());
        scheduler.clearAll();
        scheduler.parse(events);
    }

    render() {
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}