import { useState } from "react";
import "./logdata.css";

function TrueFalse(props){
    const [truefalse, setTrueFalse] = useState(true);

    const changeRadio = (event) => {
        if(truefalse) setTrueFalse(false);
        else setTrueFalse(true);
    }

    return(
        <>
            <div className = "logtype">
                <div className="logQuestion">Had a long walk Today</div>
                <div id = "truefalsetable">
                    <div id = "logTrue"> <input type="radio" name="truefalse" value="true" checked = {truefalse} onChange={changeRadio} />True </div>
                    <div id = "logFalse"> <input type="radio" name="truefalse" value="false" checked = {!truefalse} onChange = {changeRadio}/>False </div>
                </div>
            </div>
        </>
    );
}

export default TrueFalse;