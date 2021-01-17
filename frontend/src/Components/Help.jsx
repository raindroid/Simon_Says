import React, { useState } from "react";
import { accountInfo } from "./account/firebase";
import Chat from "./Chat";
import Heading from './Heading'
import { LoginDialog } from "./Home";
const Help = () =>{
    let [updateCount, setUpdateCount] = useState(0)
    return (
    <div className="container-fluid nav_bg" style={{width: "80%", marginRight: "0px"}}>
        <div className='row'>
            <div className="col-10 mx-auto"> 
                <h3>{accountInfo.signed ? "Hello, " + accountInfo.name : <LoginDialog updateCount={()=>{setUpdateCount(updateCount + 1)}}/>}</h3>
                <Heading name="How can I help?"/>
                <Chat />
                
            </div>
        </div>
        <div className = 'row'>
            
        </div>
    </div>
    );
};

export default Help 