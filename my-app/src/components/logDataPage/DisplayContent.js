import "./logdata.css";
import DateOption from "./DateOption";
import Numeric from "./Numeric";
import TrueFalse from "./TrueFalse";
import Text from "./Text";
import Multiple from "./Multiple";
import {useEffect, useState} from "react"
import { getUserAPIMethod, getLogData, updateLogAPIMethod } from "../../api/client";
import { RenderIf } from "../RenderIf";

function DisplayContent(props){
    const [questions, setQuestions] = useState([]);
    const [allLogs, setAlllogs] = useState([]);
    const [todayAns, setTodayAns] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [submit, setSubmit] = useState(false);
    const   [loading, setLoading]=useState(true);


    const changeInput = (event, qid, type) => {


        if(todayAns.length === 0){
            const updateAns = [{qid: qid, questionType: type, ans: event.target.value}];
            setTodayAns(updateAns);
        }
        else{
            const updateAns = todayAns.filter((ans) => ans.qid !== qid);
            updateAns.push({qid: qid, questionType: type, ans: event.target.value});
            setTodayAns(updateAns);
        }  
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        const findLog = {...allLogs, responses: allLogs.responses.filter((logbyDate) => formateDate(new Date(logbyDate.date)) !== formateDate(selectedDate))};

        const savelog = {...findLog, responses: [...findLog.responses, {...findLog.responses, date: selectedDate, answer: todayAns}]};
        // console.log('here', savelog);

        updateLogAPIMethod(savelog).then((result) => {
            console.log(result);
            setSubmit(true);
        })
    }

    const formateDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const nextDay = () => {
        let todayDate = formateDate(new Date());
        if(formateDate(selectedDate) === todayDate) return;
        const next = selectedDate.setDate(new Date(selectedDate).getDate() + 1);
        setSelectedDate(new Date(next));
    }

    const previousDay = () => {
        const prev = selectedDate.setDate(new Date(selectedDate).getDate() - 1);
        setSelectedDate(new Date(prev));
    }
    
    useEffect(() => {
        getUserAPIMethod(props.userid).then((user) => {
            setQuestions(user.questions);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        getLogData().then((logs) => {
            if(logs[0].responses.length === 0) setAlllogs(logs[0]);
            else {
                setAlllogs(logs[0]);
            }
            setSubmit(false);
        })
    }, [submit])

    useEffect(() => {
        if(allLogs.length === 0) return;
        const updateLogbyDate = allLogs.responses.filter((item) => formateDate(new Date (item.date)) === formateDate(selectedDate));
        if(updateLogbyDate.length === 0) setTodayAns([]);
        else setTodayAns(updateLogbyDate[0].answer);

    }, [allLogs, selectedDate])

    
    return(
         <>
             {loading && <div style={{textAlign:"center"}}>Loading...</div> }
             {!loading&&  <div id = "logdatacontent">
                <DateOption nextDay = {nextDay} previousDay = {previousDay} selectedDate = {formateDate(selectedDate)}/>
                <form onSubmit={handleSubmit}>
                    {questions.map((quest) => (
                        <div key = {quest.id}>
                            {/* {console.log(quest)}; */}
                            <RenderIf isTrue={quest.questionType === 'number'} >
                                <Numeric question = {quest.question} qid = {quest.id} changefunction = {changeInput} answer = {todayAns}/>
                            </RenderIf>
                            <RenderIf isTrue={quest.questionType === 'boolean'}>
                                <TrueFalse question = {quest.question} qid = {quest.id} changefunction = {changeInput} answer = {todayAns}/>
                            </RenderIf>
                            <RenderIf isTrue={quest.questionType === 'text'}>
                                <Text question = {quest.question} qid = {quest.id} changefunction = {changeInput} answer = {todayAns}/>
                            </RenderIf>
                            <RenderIf isTrue={quest.questionType === 'multiple-choice'}>
                                <Multiple question = {quest.question} multioption = {quest.option} qid = {quest.id} changefunction = {changeInput} answer = {todayAns}/>
                            </RenderIf>
                        </div>
                    ))}
                    <div>
                        <button type = "submit" id = "savelogData">Submit</button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default DisplayContent;