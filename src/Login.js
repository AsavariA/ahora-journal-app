import React,{useState} from "react"
import './Login.css';

function Login(props){

        return(
            <div className="form-div">
                <h1>Sign In</h1>
                <form>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <input 
                        type="password"
                        name="full-name"
                        placeholder="Password"
                    />
                </form>
                <button>Log In</button>
                <p>Don't have an account? <span onClick={props.changeSignInStatus}>Sign Up</span></p>
            </div>
        )
}

export default Login