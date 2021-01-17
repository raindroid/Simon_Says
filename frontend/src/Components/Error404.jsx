import React from "react";
import go_home from '../images/404_Back_to_Home_Button.png'
import Error404 from '../images/404_Error_Page.svg'

const Error = () =>{
    return (
    <div>
        <div className="container-fluid nav_bg">
            <div className='row'>
                <div className="col-12 pl-0 pr-0">
                    <img src={Error404} alt="Error404"/>  
                    {/* <a href="/home">
                    <img className="error-404-page-go-home"src={go_home} alt="go_home"/> </a> */}
                </div>
                
            </div>
    
    {/* <div className="row row-auto"><a href="/home">
        <img src={go_home} alt="go_home"/> </a>
    </div>  */}
        </div>
    </div>
    );
};

export default Error 