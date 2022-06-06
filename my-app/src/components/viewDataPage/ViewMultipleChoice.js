import React, {useState} from 'react';
import "./ViewData.css"
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


function ViewMultipleChoice({question}){
    const counts = { };
    for (let choice of question.choices){
        counts[choice]=0;
    }
    question.response.map((resp)=>{
        if(resp.data=='1'){
            counts[question.choices[0]]+=1
        }
        else if (resp.data=='2'){
            counts[question.choices[1]]+=1
        }
        else if (resp.data=='3'){
            counts[question.choices[2]]+=1
        }
    })
    //console.log(counts)
     let data = Object.entries(counts).map(([key, value]) => ({name:key, val: value}))


    return(
        <>
            <div id="view-multipleChoice" >
            <h2 className={"display-question"}>{question.questionInput}</h2>
                <div style={{overflow:"hidden", marginTop:"20px", width:"99%", aspectRatio:"3", height:500}}>
                    <ResponsiveContainer width="99%" >
            <BarChart width={400} height={400} data={data}>
                <Bar dataKey="val" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis />
            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>

    );
}

export default ViewMultipleChoice;