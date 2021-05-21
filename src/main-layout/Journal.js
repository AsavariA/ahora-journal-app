import React,{useState} from "react"
import fire from "../services/fire"
import "./Journal.css"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Notes from "./Components/Notes"
import Kanban from "./Components/Kanban"
import Pomodoro from "./Components/Pomodoro"
import SmallCalendar from "./Components/SmallCalendar"
import Productivity from "./Components/Productivity"
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Link} from 'react-router-dom';

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
    return (
            <div className='journal-main' style={{ backgroundColor: Color }}>
                <div className='responsive' style={{backgroundColor: 'white', position: 'absolute', zIndex:'5000', width:'100vw', height:'100%'}}>
                    <p>Oops! Sorry, We are currently not available on mobile. Please use a Desktop!</p>
                </div>
                {/*<Navbar />*/}
                <div className="header" style={{backgroundColor: Color}}>
                <h1>Hello {UserName.split(' ')[0]} :)</h1>
                <Button aria-controls="simple-menu" aria-haspopup="true" ><Link to="/cal" style={{
                    textDecoration: 'none', color: 'black'}}>Calendar</Link></Button>
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
                <div className="components" style={{backgroundColor:Color}}>
                    <div className='notes' style={{border: '2px solid black',backgroundColor:'white'}}><Notes/></div>
                    <div className='kanban' style={{border: '2px solid black',backgroundColor:'white'}}><Kanban /></div>
                    <div className='pomodoro' ><Pomodoro /></div>
                    <div className='smallcalendar'><SmallCalendar /></div>
                    <div className='productivity' style={{border: '2px solid black',backgroundColor:'white'}} ><Productivity/></div> 
                </div>
                </div>
    )
}

export default Journal