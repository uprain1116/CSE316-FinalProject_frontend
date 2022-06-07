import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { RenderIf } from "../RenderIf";
import "./loginStyle.css";
import { createUserAPIMethod, getSessionAPIMethod, createLogAPIMethod } from "../../api/client";
import axios from 'axios';

function Signup(props){

    const [newUser, setNewUser] = useState({});
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const changeInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedNewUser = {...newUser, [name]: value};
        setNewUser(updatedNewUser);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(newUser.name === undefined || newUser.name === ''){ setErr('Error: Name required'); return; }
        else if(newUser.email === undefined || newUser.email === ''){ setErr('Error: Email required'); return; }
        else if(newUser.password === undefined || newUser.password === ''){ setErr('Error: Password required'); return;}
        else if ((!/[a-z]/.test(newUser.password))) { setErr('Error: password needs at least one lowercase'); return; }
        else if ((!/[A-Z]/.test(newUser.password))) { setErr('Error: password needs at least one uppercase'); return; }
        else if ((!/[0-9]/.test(newUser.password))) { setErr('Error: password needs at least one number'); return; }

        let finalUser = {
            userInfo: {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                address: {
                    address1: "",
                    address2: ""
                },

                isAdmin: false,
                profile_url:'http://res.cloudinary.com/abhishekgaire/image/upload/v1652121601/rzfrtvnxr7syf5yecshs.jpg',

            },
            questions: []
        }



        createUserAPIMethod(finalUser).then((success) => {

            let finalLog = {
                userid: success,
                responses: []
            
            }
            createLogAPIMethod(finalLog).then((logcreated) => {
                getSessionAPIMethod().then((value) => {
                    props.setCurrentUser(value);
                    navigate('/logData');
                }).catch((err) => { });
            }).catch((err) => { });

        }).catch((err) => {
            if(err.status === undefined) {setErr('Error: duplicated email or uncorrect password format '); return;}
            let error = err.status.split(' ');

            if(error[0] === "E11000") setErr('Error: Email already exists');
            else if(error[error.length -1] === '(8).')  setErr('Error: Password must be over length 8');
            else if(error[error.length -1] === 'email') {
                let foundEmail = false;
                let userEmail = ''
                for(let i=0; i<error.length; i++){
                    if(error[i] === 'userInfo.email:') foundEmail = true;
                    else if(foundEmail) userEmail += (error[i] + ' ');
                }
                console.log(userEmail);
                setErr('Error: ' + userEmail);
            }
            else setErr('Error: Unknown, contact sangwoo1116@gmail.com');
        });
    }

    return(
        <div id = "signupBox">
            <div className = "div" id = "signup_title">
                <span>Sign Up</span>
                <button className = "simple_button" id = "closed_button" onClick={ props.profileButton }> X </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className = "Lable">
                    <label htmlFor = "signup_Name"> <b>Name</b> </label>
                </div>
                <input id = "signup_Name" type = "text" name="name" onChange = {changeInput} value={newUser.name || ''}/>
                
                <div className = "Lable"> 
                    <label htmlFor = "signup_Email"> <b>Email</b> </label>
                </div>
                <input id = "signup_Email" type = "text" name="email" onChange = {changeInput} value={newUser.email || ''}/>

                <div className = "Lable">
                    <label htmlFor = "signup_Password"> <b>Password</b> </label>
                </div>
                <input id = "signup_Password" type = "password" name="password" onChange = {changeInput} value={newUser.password || ''}/>

                <RenderIf isTrue={err !== '' }>
                    <div style={{color: 'red'}}>{err}</div>
                </RenderIf>
                <div>
                    <button type = "submit" id = "signupButton">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;