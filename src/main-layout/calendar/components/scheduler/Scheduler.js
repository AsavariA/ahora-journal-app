/* eslint-disable */
/*{ { src / components / Scheduler / Scheduler.js } }*/
import React, { useState, useEffect, Component } from 'react'
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import './Scheduler.css';


const scheduler = window.scheduler;

function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

//var eventId = scheduler.addEvent({
//    start_date: "16-06-2019 09:00",
//    end_date: "16-06-2019 12:00",
//    text: "Meeting"
//});

//var event = scheduler.getEvent(eventId);
//event.text = "Conference"; //changes event's data
//scheduler.addEvent(event.id);

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
        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventSave', (id, ev) => {
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
        /*scheduler.clearAll();*/
        scheduler.parse(events);
    }

//    function Save = () => {

//        let vars = scheduler._lame_copy(sheduler.getEvent(scheduler._lightbox_id));
//        let startDate = vars.start_date;
//        let endDate = = vars.end_date;
//        var eventId = scheduler.addEvent({
//            start_date: startDate,
//            end_date: endDate
//        })
//}

    render() {
        return (
            <div
                ref={(input) => { this.schedulerContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}