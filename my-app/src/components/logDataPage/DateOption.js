import { useState } from "react";
import "./logdata.css";
function DateOption(props){
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formateDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const nextDay = () => {
        let todayDate = formateDate(new Date());
        if(formateDate(selectedDate) === todayDate) return;
        const next = selectedDate.setDate(new Date(selectedDate).getDate() + 1);
        setSelectedDate(new Date(next));
    }

    const previousDay = () => {
        const prev = selectedDate.setDate(new Date(selectedDate).getDate() - 1);
        setSelectedDate(new Date(prev));
    }
    
    return(
        <div className = "logtype_date" id = "datatime">
            <div className="brackets" onClick={previousDay}> &#60; </div>
            <div id = "logdataDate"> {formateDate(selectedDate)} </div>
            <div className="brackets" onClick={nextDay}> &#62; </div>
        </div>
    );
}

export default DateOption;