import React from "react";
import GoalsList from "./GoalsTracker";
import Heading from './Heading'
import Navbar from '../Components/Navbar'
const Goal = () =>{
    return (
    <div className="App container-fluid nav_bg">
        <div className="col-3">
            <Navbar/>
        </div>
        <div className="row pt-5 gy-5">
            <div className="hello-gibson-welcome-back col-6 mx-auto">
            <Heading name="Today's Goals" />
            </div>
            <br/>
            <div className="col-6 mx-auto goal-rectangle">
            <GoalsList/>
        </div>
          </div>
    

    </div>  
    );
};

export default Goal 