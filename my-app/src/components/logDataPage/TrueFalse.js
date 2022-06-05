import { useState, useEffect } from "react";
import "./logdata.css";

function TrueFalse(props){
    const [truefalse, setTrueFalse] = useState("");

    const changeRadio = (event) => {
        if(truefalse === "true") setTrueFalse("false");
        else setTrueFalse("true");
        props.changefunction(event, props.qid, 'boolean')
    }

    useEffect(() => {
        const newInput = props.answer.filter((logcheck) => logcheck.qid === props.qid);
        if(newInput.length === 0) setTrueFalse("");
        else setTrueFalse(newInput[0].ans);
    }, [props.answer])

    return(
        <>
            <div className = "logtype">
                <div className="logQuestion">{props.question}</div>
                <div id = "truefalsetable">
                    <div id = "logTrue"> <input type="radio" name="truefalse" value="true" checked = {truefalse === "true"} onChange={changeRadio} />True </div>
                    <div id = "logFalse"> <input type="radio" name="truefalse" value="false" checked = {truefalse === "false"} onChange = {changeRadio}/>False </div>
                </div>
            </div>
        </>
    );
}

export default TrueFalse;