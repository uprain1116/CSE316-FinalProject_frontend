import "./profile.css";
import { useState, useEffect } from "react";
function ProfileAddress(props){

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const handleChange1 = (event) => {
        event.preventDefault();
        setAddress1(event.target.value);
    }

    const handleChange2 = (event) => {
        event.preventDefault();
        setAddress2(event.target.value);
    }


    useEffect(() => {
        if(props.address !== undefined){
            setAddress1(props.address.address1);
            setAddress2(props.address.address2)
        }
    }, [props.address])


    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Address</div>
            <div>
                <input className = "profileTextArea detailaddress" id = "address1" type = "text" value = {address1 || ""} onChange = {props.changeInput}/>
                <input className = "profileTextArea" id = "address2" type = "text" value = {address2 || ""} onChange = {props.changeInput}/>
            </div>
        </div>

    );
}

export default ProfileAddress;