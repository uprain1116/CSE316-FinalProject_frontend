import "./logdata.css";
import {useState, useEffect} from "react";

function Text(props){
    const [input, setInput] = useState('');

    const updateData = (event) => {
        event.preventDefault();
        setInput(event.target.value);
        props.changefunction(event, props.qid, 'text')
    }

    useEffect(() => {
        const newInput = props.answer.filter((logcheck) => logcheck.qid === props.qid);
        if(newInput.length === 0) setInput("");
        else setInput(newInput[0].ans);
    }, [props.answer])


    return(
        <>
            <div className = "logtype">
                <div className="logQuestion">{props.question}</div>
                <div><input id = "anyTextArea" type = "text" value = {input} onChange={updateData}/></div>
            </div>
        </>
    );
}

export default Text;