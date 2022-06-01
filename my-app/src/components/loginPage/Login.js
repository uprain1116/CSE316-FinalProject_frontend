import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
import "./loginStyle.css";
import { RenderIf } from "../RenderIf";
import axios from 'axios';

function Login(props){
    const [createNew, setCreateNew] = useState(false);
    const [err, setErr] = useState('');
    const [windowSize, setWindowSize] = useState(0);
    const navigate = useNavigate();

    const changeCreateNewState = () => { createNew ? setCreateNew(false) : setCreateNew(true) }
    const clickCreateNew = () => { changeCreateNewState(); }

    const clickLogin = (user) => {
        console.log(user)
        if(user.email === undefined || user.email === ''){ setErr('Enter a Email'); }
        else if(user.password === undefined || user.password === ''){ setErr('Enter a Password');}
        else {
                axios.post('/login', user)
                    .then((response) => {
                        console.log(response.data)
                        //setUserData(response.data)
                        //console.log('agent=== '+response.data.agent);
                        // setAgent(response.data.agent )
                        // if (agent===response.data.agent){setConcat(false)}
                        //setLogged(true);

                        //check for login
                        console.log('navigating logdat')
                        navigate('/logData');
                    })}
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
                <Signup profileButton = {clickCreateNew}/>
            </RenderIf>
        </div>
    );
}

export default Login;