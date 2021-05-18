//import Board from './components/Boards';
//import Card from './components/card';
import React, { Component } from 'react';
import Scheduler from './components/scheduler';
// eslint-disable-next-line 
import './cal.css';

class Cal extends React.Component {
    
    render() {
        return (
            <div>
             {/*<>*/}
             {/*    <main className="flexb>*/}
             {/*        <Board id="board1" className="boa>*/}
             {/*            <Card id="card1" className="card" draggable = "tr>*/}
             {/*                <p>Card 1>*/}
             {/*            </C>*/}
             {/*        </Bo>*/}
             {/*        <Board id="board2" className="boa>*/}
             {/*            <Card id="card2" className="card" draggable="tr>*/}
             {/*                <p>Card 2>*/}
             {/*            </C>*/}
             {/*        </Bo>*/}

             {/*    </m>*/}
             {/*</>*/}
                <div className='scheduler-container'>
                    <Scheduler />
                </div>
            </div>
        );
    }
}

export default Cal;
