import React from 'react';
import SchedulerMain from './main-layout/Components/Scheduler Components/SchedulerMain';

const Scheduler = () => {

    const data = [
    { start_date: '2021-06-10 6:00', end_date: '2021-06-10 8:00', text: 'Event 1', id: 1 },
    { start_date: '2021-06-13 10:00', end_date: '2021-06-13 18:00', text: 'Event 2', id: 2 }
];

    return (
        <div>
            <div className='scheduler-container'>
                <SchedulerMain events={data} />
            </div>           
        </div>
    )
}

export default Scheduler
