import './App.css';
import React from "react"
import './SignUp.css';

class SignUp extends React.Component{
    constructor(){
        super()
        this.state={}
    }

    render(){
        return(
            <div className="form-div">
                <h1>Sign Up</h1>
                <form>
                    <input 
                        type="text"
                        name="full-name"
                        placeholder="Full name"
                    />
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
                    <input 
                        type="password"
                        name="full-name"
                        placeholder="Confirm Password"
                    />
                </form>
                <button>Register</button>
                <p>Have an account? <span>Sign In</span></p>
            </div>
        )
    }
}

export default SignUp