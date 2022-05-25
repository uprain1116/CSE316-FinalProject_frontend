import "./profile.css";
function ProfilePic(props){

    const addImage = () =>{
        console.log('add image');
    }

    const rmvImage = () => {
        console.log('remove image');
    }


    return(
        <div className = "profiletype">
            <div className="profileContentTitle">Profile photo</div>
            <div id = "profileMainContainer">
                <div id = "profilePicContain"> <img id = "profilePic" src = "logo512.png" alt = "pic"/> </div>
                <div> <button type = "button" id = "addImg_button" onClick={addImage}> Choose new image </button> </div>
                <div> <button type = "button" id = "rmvImg_button" onClick={rmvImage}> Remove image </button> </div>
            </div>
        </div>
    );
}

export default ProfilePic;