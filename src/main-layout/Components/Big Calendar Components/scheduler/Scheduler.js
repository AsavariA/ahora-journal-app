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
        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('created', ev, id);
                console.log(scheduler.getEvents());
                var calEvents = {events: scheduler.getEvents()}
                window.localStorage.setItem('events',JSON.stringify(calEvents))
                console.log('created')
            }
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('updated', ev, id);
                console.log(scheduler.getEvents());
                var calEvents = {events: scheduler.getEvents()}
                window.localStorage.setItem('events',JSON.stringify(calEvents))
                console.log('updated')
            }
        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('deleted', ev, id);
                console.log(scheduler.getEvents());
                var calEvents = {events: scheduler.getEvents()}
                window.localStorage.setItem('events',JSON.stringify(calEvents))
                console.log('deleted')
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
        /*scheduler.clearAll();*/
        var bleh = JSON.parse(window.localStorage.getItem('events'));

        if (bleh){
            console.log(bleh.events);
            scheduler.parse(bleh.events);
            // console.log(scheduler.getEvents());
            var calEvents = {events: scheduler.getEvents()}
            window.localStorage.setItem('events',JSON.stringify(calEvents))
        } else {
            scheduler.parse(events);
            var calEvents = {events: scheduler.getEvents()}
            window.localStorage.setItem('events',JSON.stringify(calEvents))
        }
        
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