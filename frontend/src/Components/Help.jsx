import React, { useState } from "react";
import { accountInfo } from "./account/firebase";
import Chat from "./Chat";
import Heading from './Heading'
import { LoginDialog } from "./Home";
import { Chart } from 'react-charts'
import Navbar from '../Components/Navbar'


const Help = () =>{
    let [updateCount, setUpdateCount] = useState(0)
    return (
    <div className="container-fluid nav_bg" style={{width: "80%", marginRight: "0px"}}>
        <div className='row'>
            <div className="col-10 mx-auto"> 
                {/* <h3>{accountInfo.signed ? "Hello, " + accountInfo.name : ''}</h3> */}
    <div className="App container-fluid nav_bg">
        <div className="col-2">
          <Navbar/>
            <div style={{position: "fixed"}}>

            <LoginDialog updateCount={()=>{setUpdateCount(updateCount + 1)}}/>
            </div>
        </div>
        <div className='row pt-5 gy-5'>
            <div className="col-12 mx-auto"> 
                {/* <h3>Hello, Gibson</h3> */}
                <Heading name="How can I help?"/>
                <Chat />
                
            </div>
        </div>
        <div className = 'row'>
            
        </div>
    </div>
    </div>
    </div>
    </div>
    );
};

export default Help 