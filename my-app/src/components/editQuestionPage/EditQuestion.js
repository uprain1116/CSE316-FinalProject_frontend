import React, {useEffect, useState} from "react";
import './edit-page.css';




function EditQuestion(props){
    const[questionsList, setQuestionsList]= useState([])
    const[question,setQuestion]=useState({id:123 ,questionInput:" ", inputType:"number",choices:["okay day","Bad day","Great day"]})

    const [input, setInput]=useState('');
    //const [isMultiple, setIsMultiple]=useState(false);

    useEffect((()=>{
    console.log(questionsList)
    }),[questionsList])

    let handleSelectChange=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id === parseInt(selectedId))
        let updatedQuestion= {
            id: currentQuestion.id,
            questionInput: currentQuestion.questionInput,
            inputType: e.target.value,
            choices:currentQuestion.choices
        }

        const updatedArray = questionsList.map((ques) => {
            if (ques.id ===parseInt(selectedId)) {
                return updatedQuestion
            }
            return ques;
        })
        setQuestionsList(updatedArray);

        }


    let handleInputChange=(e)=>{
        let currentQuestionId= e.target.id
        let currentQuestion= questionsList.find((ques) => ques.id === parseInt(currentQuestionId))
        //console.log(currentQuestion,e.target.value)
        let updatedQuestion= {
            id: currentQuestion.id,
            questionInput: e.target.value,
            inputType: currentQuestion.inputType,
            choices:currentQuestion.choices
        }

        const updatedArray = questionsList.map((ques) => {

            if (ques.id ===parseInt(currentQuestionId)) {

                return updatedQuestion
            }

            return ques;
        })


        setQuestionsList(updatedArray);

    }
    let handleAddClick=()=>{
        let newQuestion= {id:Date.now(),questionInput:"new ques ", inputType:"number",choices:["okay day","Bad day","Great day"]}
        setQuestionsList([newQuestion, ...questionsList])
        //console.log(questionsList)
    }
    let handleDeleteClick=(e)=>{
        e.preventDefault()
        let newList=questionsList.filter((ques) => ques.id !==parseInt(e.target.value))

        console.log(newList)
        setQuestionsList(newList)

    }

    let handleChoice1Change=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id === parseInt(selectedId))
        let updatedChoices = [e.target.value,currentQuestion.choices[1],currentQuestion.choices[2]]
        let updatedQuestion= {
            id: currentQuestion.id,
            questionInput: currentQuestion.questionInput,
            inputType: currentQuestion.inputType,
            choices:updatedChoices,
        }
        const updatedArray = questionsList.map((ques) => {

            if (ques.id ===parseInt(selectedId)) {

                return updatedQuestion
            }

            return ques;
        })
        setQuestionsList(updatedArray);
    }
    let handleChoice2Change=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id === parseInt(selectedId))
        let updatedChoices = [currentQuestion.choices[0],e.target.value,currentQuestion.choices[2]]
        let updatedQuestion= {
            id: currentQuestion.id,
            questionInput: currentQuestion.questionInput,
            inputType: currentQuestion.inputType,
            choices:updatedChoices
        }
        const updatedArray = questionsList.map((ques) => {

            if (ques.id ===parseInt(selectedId)) {

                return updatedQuestion
            }

            return ques;
        })
        setQuestionsList(updatedArray);
    }
    let handleChoice3Change=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id === parseInt(selectedId))
        let updatedChoices = [currentQuestion.choices[0],currentQuestion.choices[1],e.target.value]
        console.log(updatedChoices)
        let updatedQuestion= {
            id: currentQuestion.id,
            questionInput: currentQuestion.questionInput,
            inputType: currentQuestion.inputType,
            choices:updatedChoices
        }
        const updatedArray = questionsList.map((ques) => {

            if (ques.id ===parseInt(selectedId)) {

                return updatedQuestion
            }

            return ques;
        })
        setQuestionsList(updatedArray);
    }

    let handleEditSubmit=(e)=>{
        e.preventDefault();
        //backend
    }



    return(
        <>
        <div className="edit-page">
            <div className={"edit-header"}>
                <div className={"edit-title"}>Edit Questions</div>
                <button onClick={handleAddClick}>+</button>
            </div>
            {questionsList.map((ques)=>(
            <div className="input-instance" >
                <form  action="#">
                    <input id={ques.id} type="text" className={"edit-input"} onChange={handleInputChange} value={ques.questionInput}/>
                    <div className="select-and-delete">
                    <select name={ques.id} id="question-types" onChange={handleSelectChange} >
                        <option value="number">number</option>s
                        <option value="boolean">boolean</option>
                        <option value="text">text</option>
                        <option value="multiple-choice">multiple choice</option>

                    </select>
                        <button className="edit-delete-button" value={ques.id} onClick={handleDeleteClick}>delete </button>

                    </div>
                    {ques.inputType==="multiple-choice" && <div>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} onChange={handleChoice1Change} name={ques.id} value={ques.choices[0]} /><br/>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} onChange={handleChoice2Change}  name={ques.id} value={ques.choices[1]} /><br/>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} onChange={handleChoice3Change} name={ques.id} value={ques.choices[2]} /><br/>
                    </div>}

                </form>
            </div>
            ))}
            {questionsList.length>0 &&
                <button type={"submit"} id={"edit-submit-button"} onClick={handleEditSubmit}>Save</button>
            }
        </div>

        </>
    );
}

export default EditQuestion;