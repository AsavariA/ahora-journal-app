import './App.css';
import React,{useState, useEffect} from "react"
import Landing from "./Landing"
import Journal from "./Journal"
import fire from './fire'

function App(){
  const[ hasAccount,setHasAccount ] = useState(false)
  const [user, setUser] = useState(null)
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


  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      console.log(user)
      if(user){
        clearInputs();
        setUser(user);
      }else{
        setUser(null);
      }
      console.log(user)
    })
  }

  useEffect(()=>{
    authListener();
  },[])

  return (
    <div>
      {user ? (
        <Journal />
      ):(
        <Landing 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin = {handleLogin}
          handleSignUp = {handleSignUp}
          emailError = {emailError}
          passwordError = {passwordError}
          hasAccount = {hasAccount}
          setHasAccount = {setHasAccount}
          />
      )}
    </div>
  );
}

export default App;
