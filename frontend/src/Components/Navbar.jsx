import React from 'react'
import '../Navbar.css';
import logo from '../images/SimonSays Logo (Light).png'
import homelogo from '../images/Home Icon (Light).png'
import schedulelogo from '../images/Schedule Icon (Light).png'
import goallogo from '../images/Goals Icon (Light).png'
import helplogo from '../images/Help Icon (Light).png'
const Navbar = () => {
    return (
      //  <div className="sidenav">
            <div className="sidenav container-fluid nav_bg" style={{boxShadow: "0 4px 8px rgba(0.1, 0.24, 0.26, 0.4)", minWidth: "120px", maxWidth: "200px"}}>
                <div className='column col-auto'>
                    <div><img className="simon-says-logo-light" style={{width: "90%", height: "auto"}} src={logo} alt="logo" /></div>   
                    <div className="row row-auto"><a href="/home">
                        <img src={homelogo} alt="homelogo"/> HOME</a>
                    </div>  

                     <div className="row row-auto"> <a href="/activities">
                        <img  src={schedulelogo} alt="schedulelogo"/> ACTIVITIES</a>
                    </div>                   
                    
                   
                    <div className="row row-auto"> <a href="/goals">
                    <img src={goallogo} alt="goallogo"/> GOALS</a>
                    </div>

                    <div className="row row-auto"><a className="help"  style={{width: "-webkit-fill-available", marginTop: "36px", padding: "24px", background: "#DD9F49"}} href="/help">
                    <img src={helplogo} alt="helplogo"/> HELP</a>
                    </div>
                    
                    
                </div>
            <div/>
        </div>
    );
};

export default Navbar;