import { useState, useEffect } from "react";
import { RenderIf } from "./RenderIf";
import { useNavigate } from "react-router-dom";
import { RenderifBigSIze } from "./RenderifBigSIze";
import { getUserAPIMethod } from "../api/client";

function Banner(props){
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState(0);
    const [admin, setAdmin] = useState(false);
    const [profile_url,setProfile_url]=useState('http://res.cloudinary.com/abhishekgaire/image/upload/v1652121601/rzfrtvnxr7syf5yecshs.jpg')
    const updateDimensions = () => { setWindowSize(window.innerWidth); }


    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if(props.userid !== '' && props.userid  !== undefined){
            getUserAPIMethod(props.userid).then((user) => {
                setAdmin(user.userInfo.isAdmin);
                setProfile_url(user.userInfo.profile_url)
            }).catch((err) => {
                // navigate('/');
            })
        }
    }, [props.userid]);

    return(
        <div id = "banner">

            <RenderifBigSIze> 
                <div id = "title"> Day Logger </div>
            </RenderifBigSIze>

            
            <div id = "menu">
                <span className = "menu_option" onClick={() => navigate('/logdata')}> Log day </span>
                <span className = "menu_option" onClick={() => navigate('/editQ')}> Edit Question </span>
                <span className = "menu_option" onClick={() => navigate('/viewData')}> View Data </span>
                <RenderIf isTrue={admin}>
                    <span className = "menu_option" onClick={() => navigate('/admin')}> Admin </span>
                </RenderIf>

            </div>
            <div id = "picture"> <img id = "profile_pic" src = {profile_url} alt = "pic" onClick={() => navigate('/profile')}/> </div>
        </div>
    );
}

export default Banner;