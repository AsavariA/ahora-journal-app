import './App.css';
import React from "react"
import Landing from "./Landing"

class App extends React.Component {
  constructor(){
    super()
    this.state={}
}

  render(){
    return (
      <div>
        <Landing />
    </div>
    );
  }
  
}

export default App;
