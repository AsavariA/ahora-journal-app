import React from "react"
import './SignUp.css';

class Login extends React.Component{
    constructor(){
        super()
        this.state={}
    }

    render(){
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
                <p>Don't have an account? <span>Sign Up</span></p>
            </div>
        )
    }
}

export default Login