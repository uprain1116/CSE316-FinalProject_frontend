import "./admin.css";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import AdminTable from "./AdminTable";
import { getUserAPIMethod } from "../../api/client";
import Delayed from "../../Delayed";


import { getAllUserAPIMethod, getLogDataById } from "../../api/client";

function Admin(props){
    const [windowSize, setWindowSize] = useState(0);
    const [admin, setAdmin] = useState(false);
    const [userLogs, setUserLogs] = useState([]);
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

    useEffect(()=> {
        getAllUserAPIMethod().then((getuser) => {
            const newGetUser = getuser.filter(user => !(user.userInfo.isAdmin));
            newGetUser.map((user) => {
                getLogDataById(user._id).then((result) => {
                    user.userLogs = result[0].responses.length;
                })
            });
            setUserLogs(newGetUser);
        })
    }, [userLogs]);


    return(
        <Delayed waitBeforeShow={500}>
        <RenderIf isTrue={admin}>
            <div id = "adminContainer">
                <RenderIf isTrue={windowSize >=600}>
                    <div className = "adminSidebar"></div>
                </RenderIf>

                <div id = "adminContent">
                    <div id = "adminTitle"> User Info </div>
                    <div id = "userInfoTable"> <AdminTable tableData = {userLogs}/> </div>
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