import React, { useState } from "react"
import './Login.css';
import "./Landing.css"
import { Button, Link, makeStyles } from '@material-ui/core';
import { PropagateLoader } from "react-spinners";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import fire from '../services/fire';

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleLogin = () => {
        setLoading(true);
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const { user } = response;
                const data = {
                    userId: user.uid,
                    email: user.email
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }

        return(
            <div className="main">
                <div className="col-1">
                    <div className="content">
                        <h1>Who you are tomorrow begins with what you do today.</h1>
                        <p>Join us for a rejuvenating experience!</p>
                    </div>
                </div>
                <div className="col-2">
                <ToastContainer />
                    <div className="form-div">
                        <h1>Sign In</h1>
                        <ValidatorForm
                                className="ValidationFrom"
                                onSubmit={handleLogin}
                                onError={errors => {
                                    for (const err of errors) {
                                        console.group(err.props.errorMessages[0])
                                    }
                                }}>
                            <TextValidator
                                    className={classes.textField}
                                    color="primary"
                                    variant="outlined"
                                    margin="normal"
                                    label="Email"
                                    onChange={handleEmail}
                                    name="email"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    size="small"
                                    // variant="filled"
                                />
                                <TextValidator
                                    className={classes.textField}
                                    color="primary"
                                    variant="outlined"
                                    margin="normal"
                                    label="Password"
                                    type="password"
                                    onChange={handlePassword}
                                    name="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete="off"
                                    size="small"
                                    // variant="filled"
                                />
                                <br/>
                                {loading ? (
                                    <PropagateLoader
                                        size={'10px'}
                                        color={"#000"}
                                        loading={loading}
                                        className={classes.loading}
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}>
                                        Log In
                                    </Button>
                                )}
                                <br />
                                <p>Don't have an account? <Link onClick={props.toggle} className={classes.pointer} variant="body2">Sign Up</Link></p>       
                        </ValidatorForm>
                    </div>
                </div>
            </div>
        )
}

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
        marginTop: '10px'
    },

    submit: {
        background: 'linear-gradient(45deg, #4B2006 30%, #4B2006 90%)',
        margin: theme.spacing(0, 0, 2),
        color: '#feefec',
        width: '100%',
    },
    pointer: {
        cursor: 'pointer',
        color: 'rgb(117, 61, 9)'
    },
    loading:{
        marginTop:'20px'
    }
}));

export default Login