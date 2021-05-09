import React,  { useState, useEffect } from "react"
import "./Landing.css"
import SignUp from "./SignUp"
import Login from"./Login"

function Landing(){
  const[ hasAccount,setHasAccount ] = useState(false)

  function changeSignInStatus(){
    setHasAccount(prevHasAccount => !prevHasAccount)
    console.log(hasAccount)
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
              (<Login changeSignInStatus={changeSignInStatus}/>):
              (<SignUp changeSignInStatus={changeSignInStatus}/>)
            }     
            </div>
          </div>
        )
}

export default Landing