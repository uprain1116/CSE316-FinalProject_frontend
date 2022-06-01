import "./profile.css";
import { useState, useEffect } from "react";
function ProfileAddress(props){

    const [address1, setAddress1] = useState(props.address.address1);
    const [address2, setAddress2] = useState(props.address.address2);

    const handleChange1 = (event) => {
        event.preventDefault();
        setAddress1(event.target.value);
    }

    const handleChange2 = (event) => {
        event.preventDefault();
        setAddress2(event.target.value);
    }


    useEffect(() => {
        setAddress1(props.address.address1);
        setAddress2(props.address.address2)
    }, [props.address])


    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Address</div>
            <div>
                <input className = "profileTextArea" id = "detailAddress" type = "text" value = {address1} onChange = {handleChange1}/>
                <input className = "profileTextArea" type = "text" value = {address2} onChange = {handleChange2}/>
            </div>
        </div>

    );
}

export default ProfileAddress;