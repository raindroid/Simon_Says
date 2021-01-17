import React, {useState} from 'react';
import GoalsList from './GoalsList'
const GoalsTracker = () =>{

const [inputList, setInputList] = useState("");
const [items, setItems] = useState([]);
const itemEvent = (event) => {
    setInputList(event.target.value);

};

const listOfItems = () =>{
    setItems((oldItems) => {
        return [...oldItems, inputList];
    });
    setInputList('');
}; 

const deleteItems = (id) =>{
    console.log("Deleted");
    setItems((oldItems) => {
        return oldItems.filter((arrElem, index) => {
            return index !== id;
        })
    })
}

return (
    <>
    <div className="center_div center-block">
        {/* <br/>
        <h1>Today's Goals</h1>
        <br/> */}
        <input className="justify-content-right" type='text' placeholder='Add new goal' 
        value = {inputList}
        onChange={itemEvent}/>
        <button onClick={listOfItems}> + </button>

        <ol>
           {
                items.map((item_val, index) => {
                return <GoalsList key= {index} id={index} text = {item_val} onSelect={deleteItems}/>
            })
           } 
        </ol>
    </div>
    </>
    )

}

export default GoalsTracker;