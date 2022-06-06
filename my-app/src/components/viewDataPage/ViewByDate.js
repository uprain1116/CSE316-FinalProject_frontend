import React, {useState} from 'react';
import "./ViewData.css"
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import ViewText from "./ViewText";
import ViewNumber from "./ViewNumber";
import ViewMultipleChoice from "./ViewMultipleChoice";
import ViewBoolean from "./ViewBoolean";


function ViewByDate({questions}){
    let objectByDate={}
    for (const question of questions) {
        console.log(question)
        // counts[response] = counts[response] ? counts[response] + 1 : 1;
        for (const resp of question.response){
            let newQuestion;
            if (question.inputType=="multiple-choice"){
                let answ_mult;
                if (resp.data=="1"){
                    answ_mult=question.choices[0]
                }
                else if(resp.data=="2"){
                    answ_mult=question.choices[1]
                }
                else{
                    answ_mult= question.choices[2]
                }
                newQuestion= {inputType:question.inputType, questionInput:question.questionInput, data:answ_mult, choices:question.choices }
            }
            else{

             newQuestion= {inputType:question.inputType, questionInput:question.questionInput, data:resp.data, choices:question.choices }
            }
        if (objectByDate[resp.date]){
            objectByDate[resp.date].push(newQuestion)
        }
        else{
            objectByDate[resp.date]=[newQuestion]
        }
    }}

    let data = Object.entries(objectByDate).map(([key, value]) => ({date:key, responses: value}))
    console.log(data)
    const [count,setCount]=useState(0)
    let handlePrevClick=()=>{
        if (count>0){
            setCount(count-1)
        }
    }
    let handleNextClick=()=>{
        if (count<data.length-1){
            setCount(count+1)
        }
    }
    console.log(count)
    let currentDate= new Date(data[count].date)

    return(
        <>
            <div id="view-by-date">

               <div className={"date-changer"}><button onClick={handlePrevClick}>{count!==0 &&  "<"} </button><span>{ new Date(data[count].date).toLocaleDateString()}</span> <button onClick={handleNextClick}>{count !==data.length-1 && ">"} </button></div>
                {data[count].responses.map((response)=>{
                    switch (response.inputType) {
                        case "text": return (
                            <div className={"each-response"}>
                                <h3>{response.questionInput}</h3>
                                <input type="text" value={response.data} className={"input-instance"} disabled/>
                            </div>
                        )
                        case "number": return (
                            <div className={"each-response"}>
                                <h3>{response.questionInput}</h3>

                                <input type="text" value={response.data} className={"input-instance"}disabled/>
                            </div>
                        )
                        case "multiple-choice": return (
                            <div className={"each-response"}>
                                <h3>{response.questionInput}</h3>
                                <input type="text" value={response.data} className={"input-instance"} disabled/>

                            </div>
                        )
                        case "boolean":return (
                            <div className={"each-response"}>
                                <h3>{response.questionInput}</h3>
                                <input type="text" value={response.data} className={"input-instance"} disabled/>

                            </div>
                        )

                    }})}

            </div>
        </>

    );
}

export default ViewByDate;