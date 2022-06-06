import React, {useState} from 'react';
import "./ViewData.css"
import { PureComponent } from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function ViewBoolean({question}){
    let True=0;
    let False=0;
    let responses= question.response.map((response) => {
        if (response.data==0){
            False+=1
        }
        else {
            True+=1
        }
    })


    const data = [{name:'True',val:True},
        {name:'False',val:False}];


    return(
        <>
            <div id="view-boolean">
        <h3>{question.questionInput}</h3>
            <BarChart width={500} height={400} data={data}>
                <Bar dataKey="val" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />

                <XAxis dataKey="name" />
                <Tooltip/>
                <YAxis />
            </BarChart>
            </div>
        </>


    );
}

export default ViewBoolean;