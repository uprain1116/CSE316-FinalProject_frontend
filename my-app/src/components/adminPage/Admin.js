import "./admin.css";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import AdminTable from "./AdminTable";


function Admin(props){
    const [windowSize, setWindowSize] = useState(0);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }

    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    return(
        <div id = "adminContainer">
            <RenderIf isTrue={windowSize >=600}>
                <div className = "adminSidebar"></div>
            </RenderIf>

            <div id = "adminContent">
                <div id = "adminTitle"> User Info </div>
                <div id = "userInfoTable"> <AdminTable/> </div>
            </div>
            <RenderIf isTrue={windowSize >=600}>
                <div className = "adminSidebar"></div>
            </RenderIf>
        </div>
    );
}

export default Admin;