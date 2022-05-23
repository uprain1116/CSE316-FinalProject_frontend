import "./logdata.css";
function DateOption(props){
    return(
        <div className = "logtype_date" id = "datatime">
            <div className="brackets"> &#60; </div>
            <div id = "logdataDate"> 3/1/2021 </div>
            <div className="brackets"> &#62; </div>
        </div>
    );
}

export default DateOption;