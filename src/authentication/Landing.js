import React,{useState, useEffect} from 'react'
import Journal from "../main-layout/Journal"
import Login from './Login'
import SignUp from './SignUp'

const Landing = () => {
  const [user,setUser]=useState('');
  const [toggleForm,setToggleForm]=useState(true);
  const formMode = () => { setToggleForm(!toggleForm); };

  const userState=()=>{
    const data=localStorage.getItem('user');
    const us=data!==null ? JSON.parse(data):null;
    setUser(us);
  }

useEffect(() => {
  userState();
  // if (user){
  //   console.log('\n\n\n\n\nnot null\n\n\n\n\n')
  // }else{
  //   console.log('\n\n\n\n\n null\n\n\n\n\n')
  // }
},[]);

  return (
    <div>
      {user ? (
          <div>
            <Journal setUserState={() => setUser(null)}/>
          </div>
          ) : (
          <div>
            {toggleForm ? 
              (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()}/>): 
              (<SignUp toggle={() => formMode()}/>)
            }
          </div>
        )
      } 
    </div>
      
  )
}

export default Landing
