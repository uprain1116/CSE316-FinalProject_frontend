import "./logdata.css";
import DateOption from "./DateOption";
import Numeric from "./Numeric";
import TrueFalse from "./TrueFalse";
import Text from "./Text";
import Multiple from "./Multiple";
import ViewText from "../viewDataPage/ViewText";
import ViewNumber from "../viewDataPage/ViewNumber";
import ViewMultipleChoice from "../viewDataPage/ViewMultipleChoice";
import ViewBoolean from "../viewDataPage/ViewBoolean";
import {useEffect, useState} from "react"
import {getUserAPIMethod} from "../../api/client";
import axios from "axios";

function DisplayContent(props){
    const [currentUserQuestions, setCurrentUserQuestions] = useState({});
    const [currentDate, setCurrentDate]= useState('')
    //const[currentLog,setCurrentLog]=useState([])
    const [log, setLog]=useState(null)

    //console.log(currentDate)

    useEffect(() => {
        if(props.userid !== '' && props.userid  !== undefined){
            getUserAPIMethod(props.userid).then((user) => {
                setCurrentUserQuestions(user.questions);

                console.log(user.questions)
            })
            axios.get("/api/logs")
                .then((res)=>{
                    if (res.data!==undefined){
                    setLog(res.data[0])

                        // let a_log=res.data[0].responses.map((response)=>{
                        //         if(response.date==currentDate){
                        //             return response.answer
                        //         }
                        //
                        //     }
                        //
                        //
                        // )
                        // console.log(currentDate)
                        // setCurrentLog(res.data[0].responses[0].answer)
                    }}

                )
                .catch((e)=>console.log(e))


        }
    }, [props.userid]);


    // useEffect(()=>{
    //     if(log!=undefined){
    //         let a= log.responses.find((response)=>response.date==currentDate)
    //         console.log(a)
    //         if(a!=undefined){
    //             setCurrentLog(a.answer)
    //         }
    //         else{
    //             setCurrentLog([])
    //         }
    //
    //     }
    //
    // },[currentDate])


    const  findQuestion=(givenId)=>{
        return currentUserQuestions.find((question) => question.id === givenId)

    }

    const handleChange = (e, givenId) => {

        let currentQuestion=findQuestion(givenId)

        let updated_logs;
        let currentResponseIndex;
        if (log!==undefined)
        { currentResponseIndex= log.responses.findIndex((res)=>res.date===currentDate)}
        if (log===undefined){
            setLog({userId:props.userid, responses:[{date:currentDate, answer:[{qid:givenId, questionType:currentQuestion.questionType, ans:e.target.value}]}]})
        }
        else if(currentResponseIndex===-1){
            updated_logs={...log, responses:[...log.responses,{date:currentDate, answer:[{qid:givenId, questionType:currentQuestion.questionType, ans:e.target.value}]}]}

            setLog(updated_logs)
        }
        else{
           let currentAnsIndex= log.responses[currentResponseIndex].answer.findIndex((ans)=>ans.qid===givenId)
            if (currentAnsIndex===-1){
                updated_logs={...log,  responses:[...log.responses.slice(0,currentResponseIndex),{ date: currentDate, answer:[...log.responses[currentResponseIndex].answer,{qid:givenId, questionType:currentQuestion.questionType, ans:e.target.value  }]}]}
                setLog(updated_logs)
            }
            else{
                updated_logs={...log, responses:[...log.responses.slice(0,currentResponseIndex),{ date: currentDate, answer:[...log.responses[currentResponseIndex].answer.slice(0,currentAnsIndex),{qid:givenId, questionType:currentQuestion.questionType, ans:e.target.value  },...log.responses[currentResponseIndex].answer.slice(currentAnsIndex+1)]},...log.responses.slice(currentResponseIndex+1)]}
                setLog(updated_logs)
            }}
    }

        const handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('/api/logs', log)
            .then((res)=>console.log(res))
            .catch((e)=>console.log(e))


    }
    return(
         <>

             {currentUserQuestions.length>0 &&  <div id = "logdatacontent">

                <DateOption setCurrentDate={setCurrentDate}/>
                <form onSubmit={handleSubmit}>
                   {currentUserQuestions.map((ques)=> {
                       //console.log(ques)

                       switch (ques.questionType) {
                           case "text":
                               return <Text
                               question={ques.question}
                               question_id={ques.id}
                               handleChange={handleChange}

                               />;
                           case "number":
                               return <Numeric question={ques.question}
                                               question_id={ques.id}
                                                handleChange={handleChange}

                               />;
                           case "multiple-choice":
                               return <Multiple question={ques.question}
                                                options={ques.option}
                                                question_id={ques.id}
                                                handleChange={handleChange}

                               />
                           case "boolean":
                               return <TrueFalse question={ques.question}
                                                 question_id={ques.id}
                                                 handleChange={handleChange}

                               />
                       }
                   })}



                      <div>
                        <button type = "submit" id = "savelogData" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default DisplayContent;