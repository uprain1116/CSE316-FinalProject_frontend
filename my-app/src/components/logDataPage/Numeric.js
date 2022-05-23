import "./logdata.css";

function Numeric(props){
    return(
        <>
            <div className = "logtype" >
                <div className="logQuestion">Number of pushups</div>
                <div><input id = "numTextArea" type = "text" /></div>
            </div>
        </>
    );
}

export default Numeric;