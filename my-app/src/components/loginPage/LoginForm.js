import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import "./loginStyle.css";

function LoginForm(props){
    const [user, setUser] = useState({});

    const changeInput = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedUser = {...user, [name]: value};
        setUser(updatedUser);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.clickLogin(user);
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor = "login_Email"> <b>Email</b> </label>
                </div>
                <input id = "login_Email" type = "text" name="email" onChange = {changeInput} value={user.email || ''}/>

                <div>
                    <label htmlFor = "login_Password"> <b>Password</b> </label>
                </div>
                <input id = "login_Password" type = "password" name="password" onChange = {changeInput} value={user.password || ''}/>

                <RenderIf isTrue={props.err !== ''}>
                    <div style={{color: 'red'}}>{props.err}</div>
                </RenderIf>

                <div>
                    <button type = "submit" id = "loginButton">Log In</button>
                </div>
            </form>

            <hr></hr>

            <button type="button" id = "newAccountButton" onClick = {props.clickCreateNew}>Create New Account</button>
        </>
    );
}


export default LoginForm;