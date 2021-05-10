import React from "react"
import fire from "./fire"

function Journal(){

  const handleLogout = () => {
    fire.auth().signOut();
  }

    return(
        <div>
            <h1>Hello</h1>
            <button onClick={handleLogout()}>LogOut</button>
        </div>
    )
}

export default Journal