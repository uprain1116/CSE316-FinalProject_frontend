import { useState } from "react";
import "./logdata.css";

function Numeric(props){
    const [input, setInput] = useState('');

    const updateData = (event) => {
        event.preventDefault();
        if(!(isNaN(event.target.value))) setInput(event.target.value);
    }

    return(
        <>
            <div className = "logtype" >
                <div className="logQuestion">Number of pushups</div>
                <div><input id = "numTextArea" type = "text" value={input} onChange={updateData}/></div>
            </div>
        </>
    );
}

export default Numeric;