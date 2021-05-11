import React,{useState} from "react"
import fire from "../services/fire"
import "./Journal.css"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function Journal(props){
const db=fire.firestore();
const [Color,setColor] = useState('#BAE1FF');
const [UserName,setUserName] = useState('');
const [anchorEl, setAnchorEl] = React.useState(null);

const handleLogOut = () => {
    localStorage.removeItem('user');
    props.setUserState();
    window.history.pushState(null,window.location.href.match(/^.*\//),"/");
}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <div className="header" style={{backgroundColor: Color}}>
            <h1>Hello {UserName.split(' ')[0]} :)</h1>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Theme</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={() => setColor('#BAE1FF')}>Uranian Blue</MenuItem>
                <MenuItem onClick={() => setColor('#FFFFBA')}>Crayola Yellow</MenuItem>
                <MenuItem onClick={() => setColor('#FFD6DA')}>Orchid Pink</MenuItem>
                <MenuItem onClick={() => setColor('#BAFFC9')}>Caledon Green</MenuItem>
                <MenuItem onClick={() => setColor('#FFECD6')}>Antique Orange</MenuItem>
            </Menu>
            <Button onClick={handleLogOut}>Logout</Button>
            </div>
        </div>
    )
}

export default Journal