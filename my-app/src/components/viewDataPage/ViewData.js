import React, {useState} from 'react';
import "./ViewData.css"
import ViewText from "./ViewText";
import ViewNumber from "./ViewNumber";
import ViewMultipleChoice from "./ViewMultipleChoice";
import ViewBoolean from "./ViewBoolean";
import ViewByDate from "./ViewByDate";

function ViewData(props){
    const [nextButtonClicked,setNextButtonClicked]=useState(false)
    const [selectValue, setSelectValue]= useState('Text')
    let handleSelectChange=(e)=>{
        setSelectValue(e.target.value)
    }
    let dummy_data= [{id:123 ,questionInput:"How are you today? ", inputType:"text",choices:["okay day","Bad day","Great day"], response:[{data:"Today I am hopeful", date:20210331},{data:"Today I am hopeful", date:20210301},{data:"Today I am happy", date:20210303},{data:"Today I am cheerful", date:20210302},] },
        {id:456 ,questionInput:"How many push ups did you do? ", inputType:"number",choices:["okay day","Bad day","Great day"], response:[{data:50, date:20210331},{data:70, date:20210301},{data:20, date:20210303},{data:91, date:20210302}]} ,
                {id:789 ,questionInput:"How was your day today? ", inputType:"multiple-choice",choices:["okay day","Bad day","Great day"], response:[{data:"okay day", date:20210331},{data:"okay day", date:20210301},{data:"bad day", date:20210303},{data:"Great Day", date:20210302}]},
        {id:101 ,questionInput:"Did you workout today? ", inputType:"boolean",choices:["okay day","Bad day","Great day"], response:[{data:false, date:20210331},{data:true, date:20210301},{data:true, date:20210303},{data:true, date:20210302}]}]
    return(
        <>
            <div className="view-data-page">
                <div className="view-data-header">
                    <div className="header-top">
                    <section>10 responses</section>
                    <section>Download</section>
                    </div>
                    <div className="header-tabs">
                    <div className="question-tab">
                        <button className={`question-button ${!nextButtonClicked && "button-color"} `} onClick={()=>{setNextButtonClicked(false)}}> View By Questions</button>
                    </div>
                        <div className="date-tab">
                            <button className={`date-button ${nextButtonClicked && "button-color"} `} onClick={()=>{setNextButtonClicked(true)}}> View By Date</button>
                        </div>
                    </div>
                </div>
                {!nextButtonClicked &&  <div>
                {dummy_data.map((ques)=>{

                    switch (ques.inputType) {
                        case "text": return <ViewText  question={ques}/>;
                        case "number": return <ViewNumber   question={ques} />;
                        case "multiple-choice": return <ViewMultipleChoice  question={ques}/>
                        case "boolean":return <ViewBoolean  question={ques}/>

                }})}
                </div>}
                {nextButtonClicked &&
                    <div>
                        <ViewByDate questions={dummy_data}/>
                    </div>

                }
            </div>
        </>
    );
}

export default ViewData;