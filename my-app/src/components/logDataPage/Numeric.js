import { useState } from "react";
import "./logdata.css";

function Numeric(props){
    const [input, setInput] = useState('');

    const updateData = (event) => {
        event.preventDefault();
        if(!(isNaN(event.target.value))) setInput(event.target.value);
        props.handleChange(event, props.question_id);
    }

    return(
        <>
            <div className = "logtype" name={"number"} id={input}>
                <div className="logQuestion">{props.question}</div>
                <div><input id = "numTextArea" type = "text" name={"number"} value={input} onChange={updateData}/></div>
            </div>
        </>
    );
}

export default Numeric;