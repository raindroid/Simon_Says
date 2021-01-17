// import React from "react";

// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import "@fullcalendar/common/main.css";
// import "@fullcalendar/timegrid/main.css";

// const TodaysCalender = () =>  {
//   const events = [{ title: "today's event", date: new Date() }];

//   return (
//     <div id='calender' className="App">
//       <FullCalendar
//         initialView="timeGridDay"
//        // defaultView="timeGridDay"
//         plugins={[timeGridPlugin, interactionPlugin]}
//         events={events}
//         dateClick={this.handleDateClick}
//       />
//     </div>

//   );
// }

// export default TodaysCalender;

import React from "react";
import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";

import AddEvents from "./AddEvents.jsx";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// import "./styles.css";

// must manually import the stylesheets for each plugin
// import "~@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import AddEvent from "./AddEvent.jsx";

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();

 
  state = {
    showComponent: false,
    //calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() },
    ],
  };

  
  render() {
    const CallAddEvents = () =>{
        this.setState({showComponent:true});
        console.log("insode calladdevents");
        console.log(this.state.showComponent);
    //   <AddEvent/>
    }

    return (
      <>
        <div className="demo-app">
          {/* <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
          &nbsp; (also, click a date/time to add an event)
        </div> */}
          <div className="demo-app-calendar">
            <FullCalendar
              initialView="timeGridDay"
              defaultView="timeGridDay"
              plugins={[timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              events={this.state.calendarEvents}
              dateClick={this.handleDateClick}
            />
            {/* <AddEvent on/> */}
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#AddEvent"
              onClick={CallAddEvents}
            >
              Add Event
            </button>
            {this.state.showComponent? <AddEvent/>:null}
          </div>
        </div>
        
      </>
    );
  }

  handleDateClick = (arg) => {
    //  if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    this.setState({
      // add new event data
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay,
      }),
    });
    //    / }
  };
}
