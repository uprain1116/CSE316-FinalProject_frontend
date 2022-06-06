import "./profile.css";
import {uploadImageToCloudinaryAPIMethod} from "../../api/client";
function ProfilePic(props){

    // const addImage = (e) =>{
    //    handleImageSelected(e)
    // }

    const rmvImage = () => {
        props.setProfileURL('http://res.cloudinary.com/abhishekgaire/image/upload/v1652121601/rzfrtvnxr7syf5yecshs.jpg')
        let a= props.currentUser
        a.currentUser.profile_url='http://res.cloudinary.com/abhishekgaire/image/upload/v1652121601/rzfrtvnxr7syf5yecshs.jpg'

        console.log(a)
        props.setCurrentUser(a)
    }

    const handleImageSelected = (event) => {

        if (event.target.files && event.target.files[0]) {
            console.log("New File Selected");
            // Could also do additional error checking on the file type, if we wanted
            // to only allow certain types of files.
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'ngrdnw4p'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);
                props.setProfileURL(response.url)
                props.changeInput(event)


            });
        }
    }



    return(
        <div className = "profiletype">

            <div className="profileContentTitle">Profile photo</div>
            <div id = "profileMainContainer">
                <div id = "profilePicContain"> <img id = "profilePic" src ={props.profileURL} alt = "pic"/> </div>
                <div>
                    <label htmlFor="file-upload" id= "addImg_button" className="custom-file-upload">Choose new Image</label>
                    <input id="file-upload" name={"profile_url"} type="file"  onChange={handleImageSelected}/>
                </div>
                <div> <button type = "button" id = "rmvImg_button" onClick={rmvImage}> Remove image </button> </div>
            </div>
        </div>
    );
}

export default ProfilePic;