import "./logdata.css";
import DateOption from "./DateOption";
import Numeric from "./Numeric";
import TrueFalse from "./TrueFalse";
import Text from "./Text";
import Multiple from "./Multiple";
function DisplayContent(props){

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(event)
    }
    return(
        <>
            <div id = "logdatacontent">
                <DateOption/>
                <form onSubmit={handleSubmit}>
                    <Numeric/>
                    <TrueFalse/>
                    <Text/>
                    <Multiple/>
                    <div>
                        <button type = "submit" id = "savelogData">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default DisplayContent;