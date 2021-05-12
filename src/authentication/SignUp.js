import React, { useEffect, useState } from 'react';
import './Login.css';
import "./Landing.css";
import { Button, Link, makeStyles } from '@material-ui/core';
import { PropagateLoader } from 'react-spinners';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import fire from '../services/fire';

function SignUp(props){

    const db = fire.firestore();
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [nameErr, setNameErr] = useState(false);
    // const [pwdError, setPwdError] = useState(false);

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSignUp = () => {
        setLoading(true);
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                if (response) {
                    alert('Registered successfully! Please log in to continue.')
                    props.toggle();
                    toast.success('User Registered Successfully');
                    db.collection('Users')
                        .doc(email)
                        .set({
                            name:name,
                            email:email,
                        })
                }
                setLoading(false);
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error(error.message);
                        break;
                    case 'auth/invalid-email':
                        toast.error(error.message);
                        break;
                    case 'auth/weak-password':
                        toast.error(error.message);
                        break;
                    default:
                        break;
                }
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [password])


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
                        <h1>Sign Up</h1>
                        <ValidatorForm
                             onSubmit={handleSignUp}
                             className="ValidationFrom">
                            
                            <TextValidator
                            className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    onChange={handleEmail}
                                    name="email"
                                    size="small"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    // variant="filled"
                                />
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    label="Name"
                                    onChange={handleName}
                                    name="name"
                                    size="small"
                                    value={name}
                                    validators={['required',]}
                                    errorMessages={['this field is required',]}
                                    autoComplete="off"
                                    // variant="filled"
                                />
                                
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    onChange={handlePassword}
                                    name="password"
                                    type="password"
                                    size="small"
                                    value={password}
                                    validators={['required',]}
                                    errorMessages={['this field is required']}
                                    autoComplete='off'
                                    // variant="filled"
                                />
                                <TextValidator
                                className={classes.textField}
                                    variant="outlined"
                                    label="Confirm password"
                                    fullWidth
                                    onChange={handleConfirmPassword}
                                    name="confirmPassword"
                                    type="password"
                                    size="small"
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                    value={confirmPassword}
                                    autoComplete="off"
                                    // variant="filled"
                                />
                                {loading ? (
                                    <PropagateLoader className={classes.loading}
                                        size={'10px'}
                                        color={"#000"}
                                        loading={loading}
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}>
                                        Register
                                    </Button>
                                )}
                                <br />
                                <p>Have an account? <Link onClick={props.toggle} className={classes.pointer} variant="body2">Log In</Link></p>
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
        margin: theme.spacing(3, 0, 2),
        color: '#feefec',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
        
    },
    pointer: {
        cursor: 'pointer',
        color: 'rgb(117, 61, 9)',
    },
    loading:{
        marginTop:'20px'
    }
}));

export default SignUp