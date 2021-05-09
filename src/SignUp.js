import './App.css';
import React, {useState} from "react"
import './Login.css';

function SignUp(props){

    const {changeSignInStatus, email, setEmail, password, setPassword, handleSignUp, emailError, passwordError, clearInputs} = props;

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
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        name="full-name"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input 
                        type="password"
                        name="full-name"
                        placeholder="Confirm Password"
                    />
                <button onClick={handleSignUp} >Register</button>
                </form>
                <p>Have an account? <span onClick={changeSignInStatus}>Sign In</span></p>
            </div>
        )
}

export default SignUp