import { useState } from "react";
import "./logdata.css";

function TrueFalse({question, question_id,handleChange,answer}){
    const [option, setOption] = useState('2');

    const changeRadio = (event) => {
        handleChange(event, question_id)
        setOption(event.target.value);
    }

    let res = (option==="1") ? "true" : "false";


    return(
        <>
            <div className = "logtype" name={"boolean"} id={res}>
                <div className="logQuestion">{question}</div>
                <div id = "truefalsetable">
                    <div id = "logTrue"> <input type="radio" name="boolean" value="1" id={res} checked = {option==="1"} onChange={changeRadio} />True </div>
                    <div id = "logFalse"> <input type="radio" value="0" checked = {option==="0"} onChange = {changeRadio}/>False </div>
                </div>
            </div>
        </>
    );
}

export default TrueFalse;