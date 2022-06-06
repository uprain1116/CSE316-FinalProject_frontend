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
        console.log(currentUser)
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
            const updatedUser = {...currentUser, ['address']: updateAddress,['profile_url']:profileURL};
            setCurrentUser(updatedUser);
            console.log(updatedUser)
        }
        else if(event.target.name=="profile_url"){
            console.log(profileURL)
            console.log("here inside profile_url change")
            const updatedUser = {...currentUser,  ['profile_url']:profileURL};
            setCurrentUser(updatedUser);
            console.log(updatedUser)
        }
        else {

            const updatedUser = {...currentUser, [name]: value, ['profile_url']:profileURL};

            setCurrentUser(updatedUser);
        }
    }

    useEffect(()=> {
        console.log(profileURL)
        console.log("here inside profile_url change")
        const updatedUser = {...currentUser,  ['profile_url']:profileURL};
        setCurrentUser(updatedUser);
        console.log(updatedUser)
    },[profileURL])

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
                console.log(user.userInfo)
                setProfileURL(user.userInfo.profile_url);
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
                        <ProfilePic changeInput={changeInput}
                        profile_url={currentUser.profile_url}
                        setProfileURL={setProfileURL}/>
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