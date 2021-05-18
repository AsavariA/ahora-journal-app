import React,{useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import { useForm } from "react-hook-form"
import * as $ from 'jquery';
import Button from '@material-ui/core/Button';

function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }
  
  const options = {
    scales: {
      yAxes: [
        {
            display: true,  
            ticks: {
              beginAtZero: true,
          },
        },
      ],
    },
  };

const LineChart = () => {
    const initialArray = localStorage.getItem('datasets') ? (JSON.parse(localStorage.getItem("datasets")).arr) : (Array(daysInThisMonth()).fill(0));
    var month_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var month = month_names[date.getMonth()];
    const { register, handleSubmit, } = useForm();
    const [datasets, setDatasets] = useState(
      {
        label: 'Your Productivity',
        data: initialArray,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
      },
    )

    const data = {
      labels: Array.from({length: daysInThisMonth()}, (_, i) => i + 1),
      datasets: [datasets],
  };            

  useEffect (() => {
    var array = {arr: datasets.data}
    window.localStorage.setItem('datasets',JSON.stringify(array))
  }, [datasets] )

    const onSubmit = (d) => {
        // console.log(d);
        // console.log(data);
        // console.log(data.datasets);
        // console.log(data.datasets[0]);
        // console.log(data.datasets[0].data);
        var prodValues = data.datasets[0].data;
        prodValues[d.day-1]=d.prod;
        console.log(prodValues)
        setDatasets({
          label: 'Your Productivity',
          data: prodValues,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
        })
        $('#productivity-form').trigger("reset");
    }

    const reset = () => {
      var conf = window.confirm('Are you sure you want to reset the enitre chart? We recommend doing it on the 1st of each month so that you can start fresh for that month!');
      if (conf===true){
          setDatasets({
          label: 'Your Productivity',
          data: Array(daysInThisMonth()).fill(0),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
        })
      }
    }



    return (
        <div>
            <h2 style={{textAlign: 'center'}}>{month}</h2>
            <form noValidate id="productivity-form" onSubmit={handleSubmit(onSubmit)}>
                    {/* <label>Enter Minutes: </label> */}
                    <div className='inputs' style={{margin:'5px auto 0 auto', textAlign:'center'}}>
                        <input
                            placeholder="Enter Day Number"
                            name="day"
                            id="day-input"
                            type='number'
                            defaultValue={date.getDate()} 
                            {...register("day",{
                                required: {value: true, message: ""},
                                min: {value: 1,  message: ""},
                                max: {value: daysInThisMonth(),  message: ""},
                            })} >
                        </input>
                        <input className="tick" type='submit' value='&#10003;'></input>
                    </div>
                    <div className='inputs' style={{margin:'5px auto 0 auto', textAlign:'center'}}>
                        <input
                            placeholder="Productivity Value"
                            name="prod"
                            id="prod-input"
                            type='number' 
                            {...register("prod",{
                                required: {value: true, message: ""},
                                min: {value: 0,  message: ""},
                                max: {value: 10,  message: ""},
                            })} >
                        </input>
                        <input className="tick" type='submit' value='&#10003;'></input>
                    </div>
                </form>  
                <div style={{textAlign:'center'}}>
                  <Button onClick={reset} >Reset Full Chart</Button>
                </div>
                <div>
                    <Line data={data} options={options} />
                </div>
        </div>
    )
}

export default LineChart
