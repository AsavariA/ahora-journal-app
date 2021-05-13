import React from 'react'
import { useForm } from "react-hook-form"
import * as $ from 'jquery';

const Form = ({setTimeLeft, setIsPaused}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data.minutes);
        $('#pomodoro-form').trigger("reset");
        setTimeLeft(data.minutes*60);
        setIsPaused(false);
    }

    return (
        <div>
            <div style={{display:'flex'}}>
                <form noValidate id="pomodoro-form" onSubmit={handleSubmit(onSubmit)}>
                    <label>Minutes: </label>
                    <input 
                        name="minutes"
                        id="minutes-input"
                        type='number' 
                        {...register("minutes",{
                            required: {value: true, message: "Please enter the number of minutes that you would like to study/work for."},
                            min: {value: .01,  message: "Please enter a number between .01 and 180."},
                            max: {value: 180,  message: "Please enter number between .01 and 180."},
                        })} >
                    </input>
                    <input type='submit'></input>
                </form>
            </div>
            <div>{errors.minutes && <p>{errors.minutes.message}</p>}</div>
        </div>
    )
}

export default Form
