import "./profile.css";
import ProfileEmail from "./ProfileEmail";
import ProfileName from "./ProfileName";
import ProfileAddress from "./ProfileAddress";
import ProfilePic from "./ProfilePic";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import { useNavigate } from "react-router-dom";
import { logoutUserAPIMethod, getUserAPIMethod, updateUserAPIMethod } from "../../api/client";
function Profile(props){

    const [windowSize, setWindowSize] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }
    const [profileURL, setProfileURL]=useState('http://res.cloudinary.com/abhishekgaire/image/upload/v1652121601/rzfrtvnxr7syf5yecshs.jpg')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUserAPIMethod(props.userid, currentUser).then((response) => {
            console.log('updated user');
        })
    }



    const changeInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.id;


        if(name === 'address1' || name === 'address2') {
            const updateAddress = {...currentUser['address'], [name]: value};
            const updatedUser = {...currentUser, ['address']: updateAddress};
            setCurrentUser(updatedUser);
        }
        else {
            const updatedUser = {...currentUser, [name]: value};
            setCurrentUser(updatedUser);
        }
    }

    const clickLogOut = (event) => {
        event.preventDefault();
        logoutUserAPIMethod().then((value) => {}).catch((err) => {});
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
    }, [props.userid]);



    return(

        <div id = "profilecarrior">

            <RenderIf isTrue={windowSize >=600}>
                <div className = "profieSidebar"></div>
            </RenderIf>
            <div id = "profileFormContainer">
                <div id = "profileTitle"> Edit Profile </div>
                    <form onSubmit={handleSubmit}>
                        <ProfilePic setProfileURL={setProfileURL}
                        profileURL={profileURL}/>
                        <ProfileName name = {currentUser.name} changeInput = {changeInput}/>
                        <ProfileEmail email = {currentUser.email} changeInput = {changeInput}/>
                        <ProfileAddress address = {currentUser.address} changeInput = {changeInput}/>
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