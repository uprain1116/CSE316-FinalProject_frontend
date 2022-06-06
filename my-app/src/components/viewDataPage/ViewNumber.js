import React, {useState} from 'react';
import "./ViewData.css"
import {Legend, LineChart, CartesianGrid, XAxis, YAxis,Tooltip,Line} from "recharts";

function ViewNumber({question}){
    let sortedResponses= question.response.sort((firstItem, secondItem) => firstItem.date - secondItem.date)
    let responses= sortedResponses.map((response) => {
        let date_data=new Date(response.date)
        return {name:date_data.toLocaleDateString(), val:response.data}
    })
    console.log(responses)

    return(
        <>
            <div id="view-number">
            <h3>{question.questionInput}</h3>
            {console.log(responses)}
            <LineChart
                width={500}
                height={300}
                data={responses}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="monotone" dataKey="val" stroke="#8884d8" dot={true} />
                <XAxis dataKey="name" />
                <Tooltip/>
                <CartesianGrid stroke="#ccc" />
                <YAxis />
            </LineChart>
            </div>
        </>


    );
}

export default ViewNumber;