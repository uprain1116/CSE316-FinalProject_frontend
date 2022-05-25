import "./profile.css";
function ProfileAddress(props){
    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Address</div>
            <div>
                <input className = "profileTextArea" id = "detailAddress" type = "text" />
                <input className = "profileTextArea" type = "text" />
            </div>
        </div>

    );
}

export default ProfileAddress;