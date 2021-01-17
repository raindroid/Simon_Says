//import React from "react";
import Heading from "./Heading";
import teddy from "../images/Simon ChatBot (Green).png";
import moment from "moment";
import React, { Component } from "react";
import '../App.css'
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
          <div className="row">
            <div className="col-2" />
            <div className="col-6 mx-auto">
            </div>
            <div className="col-4 mx-auto">
              {/* <h3>Account</h3> */}
            </div>
          </div>

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
// const Home = () =>{
//     return (
//     <div className="container-fluid nav_bg">
//         {/* First Row  */}
//         <div className='row'>
//             <div className="col-8 mx-auto">
//             {/* <Heading name='Hello Gibson,'/>
//             <h3>Welcome Back!</h3> */}
//             </div>

//             <div className="col-2 mt-2 mr-1">
//             <h3>Account</h3>
//             </div>
//         </div>

//         {/* Second Row  */}
//         <div className='row'>
//             <div className="col-8 mx-auto">
//             <Heading name='Hello Gibson,'/>
//             <h3>Welcome Back!</h3>
//             </div>

//             <div className="col-2 mx-auto">
//             {new Date().toLocaleString()} <br/>
//             {moment(  new Date().toLocaleString()).format('dddd')}
//             </div>
//         </div>
//         <br/>
//         <br/>

//         {/* Third Row  */}
//         <div className='row'>
//             <div className="col-8 mx-auto">
//             <img src={teddy} alt='Waving Teddy' width="300" height="350"/>
//             </div>

//             <div className="col-2 mx-auto">
//             <Heading name='Hello Gibson,'/>
//             <h3>Welcome Back!</h3>
//             </div>
//         </div>
//     </div>
//     );
// };

export default Home;
