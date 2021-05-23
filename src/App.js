import React from "react"
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import Cal from "./main-layout/Components/BigCalendar";
import Landing from './authentication/Landing';

function App(){
  
    return (
        <Router>
            <Switch>
                <Route exact path="/cal" component={withRouter(Cal)} />
                <Route path="/" component={withRouter(Landing)} />    
            </Switch>
        </Router>
    )
}

export default App
