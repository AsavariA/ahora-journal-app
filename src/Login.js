import React,{useState} from "react"
import './Login.css';

function Login(props){

    const {changeSignInStatus, email, setEmail, password, setPassword, handleLogin, emailError, passwordError, clearInputs} = props;

        return(
            <div className="form-div">
                <h1>Sign In</h1>
                <form>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <p>{emailError}</p>
                    <input 
                        type="password"
                        name="full-name"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <p>{passwordError}</p>
                <button onClick={handleLogin} >Log In</button>
                </form>
                <p>Don't have an account? <span onClick={changeSignInStatus}>Sign Up</span></p>
            </div>
        )
}

export default Login