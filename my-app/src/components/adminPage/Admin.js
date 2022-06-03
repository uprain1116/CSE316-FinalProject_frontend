import "./admin.css";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import AdminTable from "./AdminTable";
import { getUserAPIMethod } from "../../api/client";
import Delayed from "../../Delayed";


function Admin(props){
    const [windowSize, setWindowSize] = useState(0);
    const [admin, setAdmin] = useState(false);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }

    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        getUserAPIMethod(props.userid).then((user) => {
            setAdmin(user.userInfo.isAdmin);
        })
    }, []);

    return(
        <Delayed waitBeforeShow={500}>
        <RenderIf isTrue={admin}>
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
        </RenderIf>
        </Delayed>
    );
}

export default Admin;