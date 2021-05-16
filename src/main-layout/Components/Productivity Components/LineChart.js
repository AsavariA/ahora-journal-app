import React from 'react'
import { Line } from 'react-chartjs-2';
import { useForm } from "react-hook-form"
import * as $ from 'jquery';

function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

const data = {
    labels: Array.from({length: daysInThisMonth()}, (_, i) => i + 1),
    datasets: [
      {
        label: 'Number of Votes',
        data: Array(daysInThisMonth()).fill(0),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
            display: true,  
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 10
          },
        },
      ],
    },
  };

const LineChart = () => {
    var month_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var month = month_names[date.getMonth()];
    const { register, handleSubmit, } = useForm();

    const onSubmit = (d) => {
        // console.log(d);
        // console.log(data);
        // console.log(data.datasets);
        // console.log(data.datasets[0]);
        // console.log(data.datasets[0].data);
        var prodValues = data.datasets[0].data;
        prodValues[d.day-1]=d.prod;
        $('#productivity-form').trigger("reset");
        // console.log(prodValues);
        // console.log(data.datasets[0].data);    
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>{month}</h2>
            <form noValidate id="productivity-form" onSubmit={handleSubmit(onSubmit)}>
                    {/* <label>Enter Minutes: </label> */}
                    <div className='inputs' style={{margin:'5px auto', textAlign:'center'}}>
                        <input
                            placeholder="Enter Day Number"
                            name="day"
                            id="day-input"
                            type='number' 
                            {...register("day",{
                                required: {value: true, message: ""},
                                min: {value: 1,  message: ""},
                                max: {value: daysInThisMonth(),  message: ""},
                            })} >
                        </input>
                        <input className="tick" type='submit' value='&#10003;'></input>
                    </div>
                    <div className='inputs' style={{margin:'5px auto', textAlign:'center'}}>
                        <input
                            placeholder="Productivity Value"
                            name="prod"
                            id="prod-input"
                            type='number' 
                            {...register("prod",{
                                required: {value: true, message: ""},
                                min: {value: 1,  message: ""},
                                max: {value: 10,  message: ""},
                            })} >
                        </input>
                        <input className="tick" type='submit' value='&#10003;'></input>
                    </div>
                </form>
                <div style={{marginTop:'1rem'}}>
                    <Line data={data} options={options} />
                </div>
        </div>
    )
}

export default LineChart
