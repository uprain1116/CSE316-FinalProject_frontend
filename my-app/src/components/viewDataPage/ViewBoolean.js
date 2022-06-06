import React, {useState} from 'react';
import "./ViewData.css"
import { PureComponent } from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function ViewBoolean({question}){
    let True=0;
    let False=0;
    //console.log(question.response)
    let responses= question.response.map((response) => {
        if (response.data=='false'){
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
            <div id="view-boolean" >
        <h2 className={"display-question"}>{question.questionInput}</h2>
                <div style={{overflow:"hidden", marginTop:"20px", width:"99%", height:500}}>
                    <ResponsiveContainer width="99%">
            <BarChart width={400} height={400} data={data}>
                <Bar dataKey="val" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />

                <XAxis dataKey="name" />
                <Tooltip/>
                <YAxis />
            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>


    );
}

export default ViewBoolean;