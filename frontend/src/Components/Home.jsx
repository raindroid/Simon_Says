//import React from "react";
import Heading from "./Heading";
import teddy from "../images/Simon ChatBot (Green).png";
import moment from "moment";
import React, { Component } from "react";
import '../App.css'
import Navbar from '../Components/Navbar'
import { getUserInfo, testFunc } from "./api/generalAPI";
import { Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword, signinWithEmail, signinWithGoogle } from "./account/firebase";
import GoogleButton from 'react-google-button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { accountInfo } from "./account/firebase";

function formatDate(date, format, utc) {
  var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
      var s = i + "";
      len = len || 2;
      while (s.length < len) s = "0" + s;
      return s;
  }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
      tz = Math.abs(tz);
      var tzHrs = Math.floor(tz / 60);
      var tzMin = tz % 60;
      K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
};

export function LoginDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    
  };

  let callback = ()=>{
    if ('updateCount' in props) {
      props.updateCount()
      console.log("Force update")
    }

    if ('callback' in props) {
      props.callback()
      console.log("Execute callback")
    }
  }

  
  let data = {
    name: "",
    email: "",
    password: ""
  }  

  const signup = (data) => {
    createUserWithEmailAndPassword(data.name, data.email, data.password, callback)
    handleClose()
  }
  const signin = (data) => {
    signinWithEmail(data.email, data.password, callback)
    handleClose()
  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ color: "black"}}>
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
            onClick={ ()=>{signinWithGoogle(callback); handleClose() } }
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
    update: 0,
    schedules: []
  };

  callMe() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  getActivities = () => {
    if (accountInfo.signed) {
      getUserInfo(accountInfo, 'get_user_schedules', schedules=>{
        console.log(schedules)
        if (schedules.status == "OK") {
          delete schedules.status
          this.setState(schedules)
        }
      })
    }
  }


  
  render() {
    return (
      <>
        <div className="container-fluid nav_bg">
          
          <div className="col-2">
          <Navbar/>
            {/* <div className="row">
              <div className="col-2" />
              <div className="col-6 mx-auto">
              </div>
              <div className="col-4 mx-auto">
              // <LoginDialog callback={()=>{this.setState({update: this.state.update + 1}); this.getActivities();}}/>
                
              </div>
            </div> */}
            <div style={{bottom: "10px", position: "absolute"}}>

            <LoginDialog callback={()=>{this.setState({update: this.state.update + 1}); this.getActivities();}}/>
            </div>
          </div> 
         

          <div className="row pt-5 gy-5">
            <div className="col-2" />
            <div className="hello-gibson-welcome-back col-6 mx-auto">
              <Heading name="Hello Gibson," />
              
              <p className="text-center">Welcome Back!</p>
            </div>

            <div className="col-4 mx-auto date-block-section overflow-hidden">
            {/* <p className="today-is"> Today is {moment(new Date().toLocaleString()).format("dddd")}</p>
            <p className="time">{moment(this.state.date.toLocaleString()).format("LTS")} </p> */}
              <p className="today-is"> Today is {formatDate(new Date(), "dddd hh:mmtt d MMM yyyy")}</p>
              {/* <p className="time">{moment(this.state.date.toLocaleString()).format("LTS")} </p> */}
              {this.callMe()}
            </div>
          </div>
          
          <div className="row pt-5 gy-5">
            <div className="col-2" />
            <div className="col-6 mx-auto text-center">
              <img className='simon-chat-bot-green' src={teddy} alt="Teddy" />
            </div>

            <div className="col-4 mx-auto next-rectangle" style={{color: "white"}}>
              <h3>Next Activity</h3>
              <div>
                {Object.keys(this.state.schedules).map((key, index)=>  
                  {return <p><b>{this.state.schedules[key].Title}</b> <br/>Location: {this.state.schedules[key].location} <br/>{formatDate(new Date(this.state.schedules[key].startTime), "dddd hh:mmtt d MMM")} - {formatDate(new Date(this.state.schedules[key].endTime), "dddd hh:mmtt d MMM")}] </p>})
                }
              </div>
            </div>
          </div>
        </div>
        
       
      </>
    );
  }
}

export default Home;
