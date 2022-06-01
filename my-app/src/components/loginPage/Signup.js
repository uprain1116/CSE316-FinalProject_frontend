import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { RenderIf } from "../RenderIf";
import "./loginStyle.css";
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
       let userInfo= {
            name: newUser.name,
                email: newUser.email,
            password: newUser.password,
            address:{address1: "",
            address2: "",}}
       let questions=[{
                    id: "",
                    type:
                        "",
                    question: "",
                    option: [""] || undefined
                }]

        let finalUser={userInfo,questions}
        console.log(finalUser)
        axios.post('/register', finalUser)
            .then((response) => {
                console.log(response);

            }, (error) => {
                setErr(error);
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