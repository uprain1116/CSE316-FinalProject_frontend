import { useState, useEffect } from "react";
import { RenderIf } from "./RenderIf";
import { useNavigate } from "react-router-dom";

function Banner(props){
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState(0);
    const [admin, setAdmin] = useState(false);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }

    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);


    return(
        <div id = "banner">
            <RenderIf isTrue={windowSize >= 600}>
                <div id = "title"> Day Logger </div>
            </RenderIf>
            <div id = "menu">
                <span className = "menu_option" onClick={() => navigate('/logdata')}> Log day </span>
                <span className = "menu_option" onClick={() => navigate('/editQ')}> Edit Question </span>
                <span className = "menu_option" onClick={() => navigate('/viewData')}> View Data </span>
                <RenderIf isTrue={admin}>
                    <span className = "menu_option" onClick={() => navigate('/admin')}> Admin </span>
                </RenderIf>
            </div>
            <div id = "picture"> <img id = "profile_pic" src = "logo512.png" alt = "pic" onClick={() => navigate('/profile')}/> </div>
        </div>
    );
}

export default Banner;