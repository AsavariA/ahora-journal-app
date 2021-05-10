import React,  { useState, useEffect } from "react"
import "./Landing.css"
import './Login.css';
// import SignUp from "./SignUp"
// import Login from"./Login"
// import fire from "./fire"

function Landing(props){
  const[ hasAccount,setHasAccount ] = useState(false)

  const {email, setEmail, password, setPassword, handleSignUp, handleLogin, emailError, passwordError} = props;

  function changeSignInStatus(){
    setHasAccount(prevHasAccount => !prevHasAccount)
  }
        return(
            <div className="main">
            <div className="col-1">
              <div className="content">
                <h1>Who you are tomorrow begins with what you do today.</h1>
                <p>Join us for a rejuvenating experience!</p>
              </div>
            </div>
            <div className="col-2">
              {hasAccount?
              (<div className="form-div">
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

        ):(

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
            </div>
          </div>
        )
}

export default Landing