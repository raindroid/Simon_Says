import React from "react";
import Heading from './Heading'
import TodaysCalender from "./Today'sCalender";
import Navbar from '../Components/Navbar'
const Activities = () =>{
    return (
    <div className="container-fluid nav_bg">
    <div className='row'>
            <div className="col-3">
              <Navbar/>
            </div>
           
            <div className="col-6 ">
            <Heading name="Today's Activities"/>
            <TodaysCalender/>
            </div>
            <div className="col-3">
              {/* <h3>Account</h3> */}
            </div>
        </div>
    </div>  
    );
};

export default Activities 