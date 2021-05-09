import './App.css';
import React,{useState, useEffect} from "react"
import Landing from "./Landing"
import Journal from "./Journal"
import fire from './fire'

function App(){
  const [user, setUser] = useState('')

  const handleLogout = () =>{
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }else{
        setUser('');
      }
    })
  }

  useEffect(()=>{
    authListener();
    console.log(user);
  },[])

  return (
    <div>
      {user === '' ? (
        <Journal handleLogout={handleLogout}/>
      ):(
        <Landing />
      )}
    </div>
  );
}

export default App;
