import "./profile.css";
function ProfilePic(props){
    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Profile photo</div>
            <div id = "profileMainContainer">
                <div id = "profilePicContain"> <img id = "profilePic" src = "logo512.png" alt = "pic"/> </div>
                <div> <button id = "addImg_button"> Add New Image </button> </div>
                <div> <button id = "rmvImg_button"> Remove Image </button> </div>
            </div>
        </div>
    );
}

export default ProfilePic;