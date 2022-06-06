import React, {useState} from 'react';
import "./ViewData.css"

function ViewText({question}){
    let sortedResponses= question.response.sort((firstItem, secondItem) => firstItem.date - secondItem.date)
    let responses= sortedResponses.map((response) => {
        return response.data;
    })



    return(
        <div id={"view-text"} >

            <h2>{question.questionInput}</h2>
            <div className="all-responses">
            {responses.map((response)=>
                <>
                    <div className="each-response">{response}</div>
                </>

            )

            }
            </div>
        </div>

    );
}

export default ViewText;