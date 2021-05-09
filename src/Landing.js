import React,  { useState, useEffect } from "react"
import "./Landing.css"
import SignUp from "./SignUp"
import Login from"./Login"
import fire from "./fire"

function Landing(){
  const[ hasAccount,setHasAccount ] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;  
        }
      })
  }

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;  
        }
      })
  }

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
              (<Login 
                changeSignInStatus={changeSignInStatus}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                emailError={emailError}
                passwordError={passwordError}
                clearInputs={clearInputs}
                />):
              (<SignUp 
                changeSignInStatus={changeSignInStatus}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSignUp={handleSignUp}
                emailError={emailError}
                passwordError={passwordError}
                clearInputs={clearInputs}
                />)
            }     
            </div>
          </div>
        )
}

export default Landing