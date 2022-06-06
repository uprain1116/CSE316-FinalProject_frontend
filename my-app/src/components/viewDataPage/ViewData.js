import React, {useState} from 'react';
import "./ViewData.css"
import ViewText from "./ViewText";
import ViewNumber from "./ViewNumber";
import ViewMultipleChoice from "./ViewMultipleChoice";
import ViewBoolean from "./ViewBoolean";
import ViewByDate from "./ViewByDate";
import {useEffect} from "react";
import {getLogData, getLogDataById, getUserAPIMethod} from "../../api/client";

function ViewData(props){
    const [nextButtonClicked,setNextButtonClicked]=useState(false)
    const [selectValue, setSelectValue]= useState('Text')
    const [allLogs, setAllLogs] = useState([
        {
            "date": "2022-06-06T06:28:25.857Z",
            "answer": [
                {
                    "qid": "1654496841799",
                    "questionType": "boolean",
                    "ans": "true",
                    "_id": "629d9e97e476cf3818df3499"
                },
                {
                    "qid": "1654496841591",
                    "questionType": "multiple-choice",
                    "ans": "1",
                    "_id": "629d9e97e476cf3818df349a"
                },
                {
                    "qid": "1654496841281",
                    "questionType": "number",
                    "ans": "12",
                    "_id": "629d9e97e476cf3818df349b"
                },
                {
                    "qid": "1654496841087",
                    "questionType": "text",
                    "ans": "React",
                    "_id": "629d9e97e476cf3818df349c"
                }
            ],
            "_id": "629d9e97e476cf3818df3498"
        },
        {
            "date": "2022-06-05T06:28:25.857Z",
            "answer": [
                {
                    "qid": "1654496841799",
                    "questionType": "boolean",
                    "ans": "true",
                    "_id": "629d9eace476cf3818df34a6"
                },
                {
                    "qid": "1654496841591",
                    "questionType": "multiple-choice",
                    "ans": "2",
                    "_id": "629d9eace476cf3818df34a7"
                },
                {
                    "qid": "1654496841281",
                    "questionType": "number",
                    "ans": "6",
                    "_id": "629d9eace476cf3818df34a8"
                },
                {
                    "qid": "1654496841087",
                    "questionType": "text",
                    "ans": "Sockets api",
                    "_id": "629d9eace476cf3818df34a9"
                }
            ],
            "_id": "629d9eace476cf3818df34a5"
        }
    ]);

    const [gotData , setGotData]=useState(false);
    const [questions, setQuestions]=useState([])

    useEffect(() => {
        getLogData().then((logs) => {
            console.log(logs[0].responses)
            if(logs[0].responses.length === 0) setAllLogs(logs[0].responses);
            else {
                setAllLogs(logs[0].responses);
            }

        })
        setGotData(true)
    }, [questions])
    console.log(allLogs.array)
    let handleSelectChange=(e)=>{
        setSelectValue(e.target.value)
    }
    useEffect(() => {
        getUserAPIMethod(props.userid).then((user) => {
            setQuestions(user.questions);
        }).catch((err) => {
            console.log(err);
        })
    }, [props.userid])

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(dummy_data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    };
console.log(questions)
    let a=[]

    let dict={}

    let dummy_data=[]

    if( allLogs!=undefined) {
        allLogs.map((q) => q.answer.map((answ) => {
            if (dict[answ.qid]) {
                dict[answ.qid].push({date: q.date, data: answ.ans})
            } else {
                dict[answ.qid] = [{date: q.date, data: answ.ans}]
            }
        }))

        let data = Object.entries(dict).map(([key, value]) => ({qid: key, responses: value}))
        console.log(data)
        if (questions.length > 0) {
            data.map((dataChild) => {
                    let currentQuestion = questions.find((ques) => ques.id == dataChild.qid)
                if(currentQuestion!=undefined){
                    dummy_data.push({
                        id: dataChild.qid,
                        questionInput: currentQuestion.question,
                        inputType: currentQuestion.questionType,
                        choices: currentQuestion.option,
                        response: dataChild.responses
                    })}
                }
            )
        }
    }

    console.log(dummy_data)


    let dummy_data1= [{id:123 ,questionInput:"How are you today? ", inputType:"text",choices:["okay day","Bad day","Great day"], response:[{data:"Today I am hopeful", date:20210331},{data:"Today I am hopeful", date:20210301},{data:"Today I am happy", date:20210303},{data:"Today I am cheerful", date:20210302},] },
        {id:456 ,questionInput:"How many push ups did you do? ", inputType:"number",choices:["okay day","Bad day","Great day"], response:[{data:50, date:20210331},{data:70, date:20210301},{data:20, date:20210303},{data:91, date:20210302}]} ,
                {id:789 ,questionInput:"How was your day today? ", inputType:"multiple-choice",choices:["okay day","Bad day","Great day"], response:[{data:"okay day", date:20210331},{data:"okay day", date:20210301},{data:"bad day", date:20210303},{data:"Great Day", date:20210302}]},
        {id:101 ,questionInput:"Did you workout today? ", inputType:"boolean",choices:["okay day","Bad day","Great day"], response:[{data:false, date:20210331},{data:true, date:20210301},{data:true, date:20210303},{data:true, date:20210302}]}]
    return(
        <>
            {dummy_data.length>0&&
            <div className="view-data-page">
                <div className="view-data-header">
                    <div className="header-top">
                    <section>{allLogs.length} responses</section>
                    <section onClick={exportData} id={"download-button"}>Download JSON</section>
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
            </div>}
        </>
    );
}

export default ViewData;