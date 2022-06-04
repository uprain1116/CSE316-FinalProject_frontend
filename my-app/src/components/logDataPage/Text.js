import "./logdata.css";
import {useState} from "react";

function Text(props){
    const [input, setInput] = useState('');

    const updateData = (event) => {
        event.preventDefault();
        setInput(event.target.value);
        props.handleChange(event, props.question_id);
    }
    return(
        <>
            <div className = "logtype" name="text" id={input}>
                <div className="logQuestion">{props.question}</div>
                <input id = "anyTextArea" type = "text"  value={input} onChange={updateData}/>
            </div>
        </>
    );
}

export default Text;