import "./logdata.css";

function Text(props){
    return(
        <>
            <div className = "logtype">
                <div className="logQuestion">One great thing that happened today</div>
                <div><input id = "anyTextArea" type = "text" /></div>
            </div>
        </>
    );
}

export default Text;