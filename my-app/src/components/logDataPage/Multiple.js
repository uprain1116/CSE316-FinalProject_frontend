import { useState } from "react";
import "./logdata.css";

function Multiple(props){
    const [option, setOption] = useState('0');

    const changeRadio = (event) => {
        //        event.preventDefault();
        setOption(event.target.value);
    }

    return(
        <>
            <div className = "logtype">
                <div className="logQuestion">Had a long walk Today: </div>
                <div id = "multipleBox">
                    <div className="logMul"> <input type="radio" name="multiple" value="1" checked = {option === '1'} onChange={changeRadio} />Ok day </div>
                    <div className="logMul"> <input type="radio" name="multiple" value="2" checked = {option === '2'} onChange = {changeRadio}/>Bad day </div>
                    <div> <input type="radio" name="multiple" value="3" checked = {option === '3'} onChange = {changeRadio}/>Great day </div>
                </div>
            </div>
        </>
    );
}

export default Multiple;