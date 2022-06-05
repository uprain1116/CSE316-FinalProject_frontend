import { useState, useEffect } from "react";
import "./logdata.css";

function Numeric(props){
    const [input, setInput] = useState('');

    const updateData = (event) => {
        event.preventDefault();
        if(!(isNaN(event.target.value))) {
            setInput(event.target.value);
            props.changefunction(event, props.qid, 'number');
        }
    }

    useEffect(() => {
        const newInput = props.answer.filter((logcheck) => logcheck.qid === props.qid);
        if(newInput.length === 0) setInput('');
        else setInput(newInput[0].ans);

    }, [props.answer])

        // allUsers = allUsers.filter(user => !(user.userInfo.isAdmin));

    return(
        <>
            <div className = "logtype" >
                <div className="logQuestion">{props.question}</div>
                <div><input id = "numTextArea" type = "text" value={input} onChange={updateData}/> </div>
            </div>
        </>
    );
}

export default Numeric;