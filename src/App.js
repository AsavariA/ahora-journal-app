import './App.css';
import React,{useState, useEffect} from "react"
import Journal from "./main-layout/Journal"
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'

function App(){
  const [user,setUser]=useState('');
  const [toggleForm,setToggleForm]=useState(true);
  const formMode = () => { setToggleForm(!toggleForm); };

  const userState=()=>{
    const data=localStorage.getItem('user');
    const us=data!==null ? JSON.parse(data):null;
    setUser(us);
  }

useEffect(()=>{
  userState();
},[]);

    return (
        <div>
            
      <>
        {user !== null ? (
          <>
            <Journal setUserState={() => setUser(null)}/>
          </>
        ) : (
           <>
           {toggleForm ? 
            (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()}/>) 
          : (<SignUp toggle={() => formMode()}/>)}
          
       </>
        )} 
            </>
        </div>
    );
}

export default App;
