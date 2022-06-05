import "./logdata.css";
import DisplayContent from "./DisplayContent";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
function LogData(props){
    const [windowSize, setWindowSize] = useState(0);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }



    useEffect(() => {

        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    return(
        <>
            <div id = "logdatacarrior">
                <RenderIf isTrue={windowSize >=600}>
                    <div className = "sidebar"></div>
                </RenderIf>
                <DisplayContent userid = {props.userid}/>
                <RenderIf isTrue={windowSize >=600}>
                    <div className = "sidebar"></div>
                </RenderIf>
            </div>
        </>
    );
}

export default LogData;