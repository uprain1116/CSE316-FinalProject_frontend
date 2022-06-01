import "./profile.css";
import ProfileEmail from "./ProfileEmail";
import ProfileName from "./ProfileName";
import ProfileAddress from "./ProfileAddress";
import ProfilePic from "./ProfilePic";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import { useNavigate } from "react-router-dom";
import { logoutUserAPIMethod, getUserAPIMethod } from "../../api/client";
function Profile(props){

    const [windowSize, setWindowSize] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit")
    }

    const clickLogOut = (event) => {
        event.preventDefault();
        logoutUserAPIMethod();
        navigate("/");
    }

    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if(props.userid !== '' && props.userid  !== undefined){
            getUserAPIMethod(props.userid).then((user) => {
                setCurrentUser(user.userInfo);
            })
        }
    }, []);



    return(
        <div id = "profilecarrior">
            <RenderIf isTrue={windowSize >=600}>
                <div className = "profieSidebar"></div>
            </RenderIf>
            <div id = "profileFormContainer">
                <div id = "profileTitle"> Edit Profile </div>
                    <form onSubmit={handleSubmit}>
                        <ProfilePic/>
                        <ProfileName name = {currentUser.name}/>
                        <ProfileEmail email = {currentUser.email}/>
                        {console.log('here', currentUser)}
                        <ProfileAddress address = {currentUser.address}/>
                        <div>
                            <button type = "submit" id = "saveProfileData">Save</button>
                            <button type = "button" id = "logOutProfile" onClick = {clickLogOut}>Logout</button>
                        </div>
                    </form>
            </div>
            <RenderIf isTrue={windowSize >=600}>
                <div className = "profieSidebar"></div>
            </RenderIf>
        </div>
    );
}

export default Profile;