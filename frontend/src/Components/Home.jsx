//import React from "react";
import Heading from "./Heading";
import teddy from "../images/Simon ChatBot (Green).png";
import moment from "moment";
import React, { Component } from "react";
import '../App.css'
import Navbar from '../Components/Navbar'
import { testFunc } from "./api/generalAPI";
import { Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword, signinWithEmail, signinWithGoogle } from "./account/firebase";
import GoogleButton from 'react-google-button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { accountInfo } from "./account/firebase";

export function LoginDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    if ('updateCount' in props) {
      props.updateCount()
      console.log("Force update")
    }
  };
  
  let data = {
    name: "",
    email: "",
    password: ""
  }  

  const signup = (data) => {
    createUserWithEmailAndPassword(data.name, data.email, data.password, handleClose)
    handleClose()
  }
  const signin = (data) => {
    signinWithEmail(data.email, data.password, handleClose)
    handleClose()
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {accountInfo.signed ? accountInfo.name : "Sign in / sign up"}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField id="standard-basic" label="name" onChange={e=>{data.name=e.target.value}}/>
          <TextField id="standard-basic" label="email" onChange={e=>{data.email=e.target.value}}/>
          <TextField id="standard-basic" label="password" type="password" onChange={e=>{data.password=e.target.value}}/>
          <Button variant="contained" color="secondary" onClick={()=>signup(data)}>
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" onClick={()=>signin(data)}>
            Sign In
          </Button>
          <GoogleButton
            onClick={ ()=>{signinWithGoogle(data, handleClose); handleClose() } }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class Home extends Component {
  

  state = {
    date: new Date(),
  };

  callMe() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  

  render() {
    return (
      <>
        <div className="container-fluid nav_bg">
          
          <div className="col-2">
          <Navbar/>
          </div>
         
            <LoginDialog />

          <div className="row pt-5 gy-5">
            <div className="col-2" />
            <div className="hello-gibson-welcome-back col-6 mx-auto">
            <Heading name="Hello Gibson," />
            
            <p className="text-center">Welcome Back!</p>
            </div>

            <div className="col-4 mx-auto date-block-section overflow-hidden">
            <p className="today-is"> Today is {moment(new Date().toLocaleString()).format("dddd")}</p>
            <p className="time">{moment(this.state.date.toLocaleString()).format("LTS")} </p>
            {this.callMe()}
            </div>
          </div>
          
          <div className="row pt-5 gy-5">
          <div className="col-2" />
            <div className="col-6 mx-auto text-center">
              <img className='simon-chat-bot-green' src={teddy} alt="Teddy" />
            </div>

            <div className="col-4 mx-auto next-rectangle">
              <h3>Next Activity</h3>
            </div>
          </div>
        </div>
        
       
      </>
    );
  }
}

export default Home;
