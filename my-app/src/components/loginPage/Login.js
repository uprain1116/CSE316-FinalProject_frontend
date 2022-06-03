import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
import "./loginStyle.css";
import { RenderIf } from "../RenderIf";
import { loginUserAPIMethod } from "../../api/client";

function Login(props){
    const [createNew, setCreateNew] = useState(false);
    const [err, setErr] = useState('');
    const [windowSize, setWindowSize] = useState(0);
    const navigate = useNavigate();

    const changeCreateNewState = () => { createNew ? setCreateNew(false) : setCreateNew(true) }
    const clickCreateNew = () => { changeCreateNewState(); }

    const clickLogin = (user) => {
        if(user.email === undefined || user.email === ''){ setErr('Enter a Email'); }
        else if(user.password === undefined || user.password === ''){ setErr('Enter a Password');}
        else {
            loginUserAPIMethod(user).then((valid) => {
                props.setCurrentUser(valid);
                navigate('/logdata');
            }).catch((err) => {
                console.log(err);
                setErr('Error: Invalid email and/or password');
            });
        }
    }

    return(
        <div id = "landingPage">
            <div id = "landingContent">
                <div id = "mainTitle">Day Logger</div>
                <div id = "discript">Make a record everyday</div>
                <div id = "loginBox">
                    <LoginForm  clickLogin = {clickLogin} clickCreateNew = {clickCreateNew} err = {err}/>
                </div>
            </div>
            <RenderIf isTrue={createNew}>
                <Overlay profileButton = {clickCreateNew}/>
                <Signup profileButton = {clickCreateNew} setCurrentUser = {props.setCurrentUser}/>
            </RenderIf>
        </div>
    );
}

export default Login;