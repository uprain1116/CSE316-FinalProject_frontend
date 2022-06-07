import { useState } from "react";
import "./logdata.css";
function DateOption(props){
    
    return(
        <div className = "logtype_date" id = "datatime">
            <div className="brackets" onClick={props.previousDay}> &#60; </div>
            <div id = "logdataDate" data-testid="selected-date"> {props.selectedDate} </div>
            <div className="brackets" onClick={props.nextDay}> &#62; </div>
        </div>
    );
}

export default DateOption;