import React from "react"
import fire from "../services/fire"

function Journal(props){
const db=fire.firestore();
const [UserName,setUserName]=React.useState('');
const handleClose = () => {
    localStorage.removeItem('user');
    props.setUserState();
    window.history.pushState(null,window.location.href.match(/^.*\//),"/");
}

if(localStorage.getItem('user')!==null){
    const ls=JSON.parse(localStorage.getItem("user")).email;
    db.collection('Users')
    .doc(ls)
    .get()
    .then(function(doc){
        if(doc.exists){
            var UserName=doc.data().name;
            setUserName(UserName);
        }
        else{
            console.log("No such Document found");
        }
    }).catch(function(error){
        console.log("Error getting document: ",error)
    });
}
    return(
        <div>
            <h1>Hello {UserName}</h1>
            <button onClick={handleClose}>Logout</button>
        </div>
    )
}

export default Journal