import React from "react"
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import Cal from "./main-layout/Components/BigCalendar";
import Landing from './authentication/Landing';

function App(){
  
    return (
        <Router>
            <Switch>
                <Route exact path="/cal" component={withRouter(Cal)} />
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
                        </div>
            </Switch>
        </Router>
        </div>
           
    )
}

export default App
