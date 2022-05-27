import React, {useState} from 'react';
import "./ViewData.css"
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";


function ViewMultipleChoice({question}){
    let sortedResponses= question.response.sort((firstItem, secondItem) => firstItem.date - secondItem.date)
    let responses= sortedResponses.map((response) => {
        return response.data;
    })

    const counts = {};

    for (const response of responses) {
        counts[response] = counts[response] ? counts[response] + 1 : 1;
    }
    let data = Object.entries(counts).map(([key, value]) => ({name:key, val: value}))

    // const data = [{name:'True',val:True},
    //     {name:'False',val:False}];

    return(
        <>
            <div id="view-multipleChoice">
            <h3>{question.questionInput}</h3>
            <BarChart width={500} height={400} data={data}>
                <Bar dataKey="val" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis />
            </BarChart>
            </div>
        </>

    );
}

export default ViewMultipleChoice;