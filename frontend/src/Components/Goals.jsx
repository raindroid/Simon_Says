import React from "react";
import GoalsList from "./GoalsTracker";
import Heading from './Heading'
const Goal = () =>{
    return (
    <div className="container-fluid nav_bg">
    <div className='row'>
        <div className="col-10 mx-auto">
            <Heading name="Today's Goals"/>
                
        </div>
    </div>
    
    <div className='row'>
        <div className="col-10 mx-auto">
            <Heading name="Today's Goals"/>
            <br/>
            <GoalsList/>
        </div>
        </div>
    </div>  
    );
};

export default Goal 