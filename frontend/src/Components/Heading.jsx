import React from "react";

const Heading = (props) =>{
    return (
        <div className="container-fluid nav_bg">
        <div className='row'>
            <div className="col-10 mx-auto text-center">
            <h1>{props.name}</h1>
            </div>
        </div>
    </div>
    );
};

export default Heading 