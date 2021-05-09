import React from "react"
import "./Landing.css"
import SignUp from "./SignUp"

class Landing extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(
            <div className="main">
            <div className="col-1">
              <div className="content">
                <h1>Who you are tomorrow begins with what you do today.</h1>
                <p>Join us for a rejuvenating experience!</p>
              </div>
            </div>
            <div className="col-2">
              <SignUp />
            </div>
          </div>
        )
    }
}

export default Landing