import { useState, useEffect } from "react";
import "./logdata.css";

function Multiple(props){
    const [option, setOption] = useState('0');

    const changeRadio = (event) => {
        setOption(event.target.value);
        props.changefunction(event, props.qid, 'multiple-choice')
    }

    useEffect(() => {
        const newInput = props.answer.filter((logcheck) => logcheck.qid === props.qid);
        if(newInput.length === 0) setOption("0");
        else setOption(newInput[0].ans);
    }, [props.answer])

    return(
        <>
             <div className = "logtype">
                <div className="logQuestion">{props.question}</div>
                <div id = "multipleBox">
                    <div className="logMul"> <input type="radio" name="multiple" value="1" checked = {option === '1'} onChange={changeRadio} /> {props.multioption[0]} </div>
                    <div className="logMul"> <input type="radio" name="multiple" value="2" checked = {option === '2'} onChange = {changeRadio}/> {props.multioption[1]} </div>
                    <div> <input type="radio" name="multiple" value="3" checked = {option === '3'} onChange = {changeRadio}/> {props.multioption[2]} </div>
                </div>
            </div>
        </>
    );
}

export default Multiple;