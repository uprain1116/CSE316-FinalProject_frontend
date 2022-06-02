import "./profile.css";
import { useState, useEffect } from "react";
function ProfileEmail(props){

    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    useEffect(() => {
        setEmail(props.email)
    }, [props.email])


    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Email</div>
            <div><input className = "profileTextArea" type = "text" value = {email || ""} onChange = {handleChange}/></div>
        </div>

    );
}

export default ProfileEmail;