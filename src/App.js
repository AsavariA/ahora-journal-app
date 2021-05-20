import './App.css';
import React,{useState, useEffect} from "react"
import Journal from "./main-layout/Journal"
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Cal from "./main-layout/calendar/cal";

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
        <Router>
            <Switch>
                <Route exact path="/cal" component={Cal} />
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
            </Switch>
        </Router>
    )
}

export default App
