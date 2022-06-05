import { useState } from "react";
import "./logdata.css";

function Multiple({question,options,handleChange,question_id,answer}){
    const [option, setOption] = useState('3');

    const changeRadio = (event) => {
        handleChange(event, question_id)
        setOption(event.target.value);
    }

    return(
        <>
            <div className = "logtype" name={"multiple-choice"} id={option}>
                <div className="logQuestion">{question} </div>
                <div id = "multipleBox">
                    <div className="logMul"> <input type="radio" name="multiple-choice" id={option} value="0" checked = {option === '0'} onChange={changeRadio} />{options[0]} </div>
                    <div className="logMul"> <input type="radio"  value="1" checked = {option === '1'} onChange = {changeRadio}/>{options[1]} </div>
                    <div> <input type="radio" name="multiple"  value="2" checked = {option === '2'}  onChange = {changeRadio}/>{options[2]} </div>
                </div>
            </div>
        </>
    );
}

export default Multiple;