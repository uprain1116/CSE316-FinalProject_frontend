import { useState, useEffect } from "react";
import "./profile.css";
function ProfileName(props){

    const [name, setName] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    useEffect(() => {
        setName(props.name)
    }, [props.name])

    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Name</div>
            <div><input className = "profileTextArea" type = "text" value = {name || ""} onChange = {handleChange}/></div>
        </div>
    );
}

export default ProfileName;