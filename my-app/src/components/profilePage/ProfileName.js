import "./profile.css";
function ProfileName(props){
    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Name</div>
            <div><input className = "profileTextArea" type = "text" /></div>
        </div>

    );
}

export default ProfileName;