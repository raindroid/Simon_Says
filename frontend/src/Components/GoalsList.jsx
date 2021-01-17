import React from 'react';

import "font-awesome/css/font-awesome.min.css";

const GoalsList = (props) =>{
  
    return (
        <>
        <div className="todo_style">  
        <li>{props.text} 
        <i className="far fa-check-circle"  onClick = {() =>{
            props.onSelect(props.id);
        }}></i>
        </li>
        </div>
        </>
    );
}
export default GoalsList;