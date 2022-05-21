function Overlay(props){

    const overlayClick = (event) => {
        if(window.innerWidth > 600){
            props.profileButton();
        }
    };

    return(
        <div className = "div" id = "overlay" onClick = { overlayClick }></div> 
    );

}

export default Overlay;