import React, {useState} from 'react';
import "./ViewData.css"
import {Legend, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer} from "recharts";

function ViewNumber({question}){
    let sortedResponses= question.response.sort((firstItem, secondItem) => new Date(firstItem.date) - new Date(secondItem.date))
    //console.log(sortedResponses)
    let responses= question.response.map((response) => {
        let date_data=new Date(response.date)
        return {name:date_data.toLocaleDateString(), val:parseInt(response.data)}
    })
    //console.log(responses)

    return(
        <>
            <div id="view-number" >
            <h2 className={"display-question"}>{question.questionInput}</h2>

        <div style={{ marginTop:"20px", width:"100%", height:500}}>
            <ResponsiveContainer width="99%">
            <LineChart
                width={400}
                height={400}
                data={responses}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="monotone" dataKey="val" stroke="#8884d8" dot={true} />
                <XAxis dataKey="name" />
                <Tooltip/>

                <CartesianGrid stroke="#ccc" />
                <YAxis />
            </LineChart>
            </ResponsiveContainer>
            </div>
            </div>
        </>


    );
}

export default ViewNumber;