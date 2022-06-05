import React, {useEffect, useState} from "react";
import './edit-page.css';
import {getUserAPIMethod, updateUserQAPIMethod, getLogData} from "../../api/client";




function EditQuestion(props){
    //console.log(props.userid)
    const [isLoading, setIsLoading]=useState(true)
    const[questionsList, setQuestionsList]= useState([])
    const[question,setQuestion]=useState({id:123 ,question:" ", questionType:"number",option:["okay day","Bad day","Great day"]})
    const [currentUser, setCurrentUser] = useState({});
    const [input, setInput]=useState('');
    //const [isMultiple, setIsMultiple]=useState(false);


    useEffect(() => {
        if(props.userid !== '' && props.userid  !== undefined){
            getUserAPIMethod(props.userid).then((user) => {
                setCurrentUser(user)
                setQuestionsList(user.questions);
                setIsLoading(false);
                console.log(user.questions)
            })
        }
    }, [props.userid]);

    useEffect((()=>{


    }),[questionsList])



    let handleSelectChange=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id ==selectedId)
        console.log(e.target.value)
        console.log(currentQuestion)
        let updatedQuestion= {

            id: currentQuestion.id,
            question: currentQuestion.question,
            questionType: e.target.value,
            option:currentQuestion.option
        }

        const updatedArray = questionsList.map((ques) => {
            if (ques.id ==selectedId) {
                return updatedQuestion
            }
            return ques;
        })
        setQuestionsList(updatedArray);
        console.log(updatedArray)

        }


    let handleInputChange=(e)=>{
        let currentQuestionId= e.target.id
        console.log(questionsList)
        let currentQuestion= questionsList.find((ques) => ques.id == currentQuestionId)

        let updatedQuestion= {
            id: currentQuestion.id,
            question: e.target.value,
            questionType: currentQuestion.questionType,
            option:currentQuestion.option
        }

        const updatedArray = questionsList.map((ques) => {

            if (ques.id ==currentQuestionId) {

                return updatedQuestion
            }

            return ques;
        })


        setQuestionsList(updatedArray);

    }
    let handleAddClick=()=>{
        let newQuestion= {id:Date.now(),question:"new ques ", questionType:"number",option:["okay day","Bad day","Great day"]}
        setQuestionsList([newQuestion, ...questionsList])
        //console.log(questionsList)
    }
    let handleDeleteClick=(e)=>{
        e.preventDefault()



        let newList=questionsList.filter((ques) => ques.id !=e.target.value)

        //
        //
        //console.log(newList)
        setQuestionsList(newList)

    }

    let handleOptionChange=(e)=>{
        let selectedId= e.target.name
        let currentQuestion= questionsList.find((ques) => ques.id == selectedId)
        console.log(currentQuestion)
        let updatedOptions;
        switch(e.target.id){
            case "first-option":
              updatedOptions  = [e.target.value,currentQuestion.option[1],currentQuestion.option[2]]
                break
            case "second-option":
                updatedOptions = [currentQuestion.option[0],e.target.value,currentQuestion.option[2]]
                break
            case "third-option":
                updatedOptions = [currentQuestion.option[0],currentQuestion.option[1],e.target.value]
                break
        }

        console.log(updatedOptions)
        let updatedQuestion= {
            id: currentQuestion.id,
            question: currentQuestion.question,
            questionType: currentQuestion.questionType,
            option:updatedOptions,
        }
        const updatedArray = questionsList.map((ques) => {

            if (ques.id ==selectedId) {

                return updatedQuestion
            }

            return ques;
        })
        console.log(updatedArray)
        setQuestionsList(updatedArray);
    }
    // let handleChoice2Change=(e)=>{
    //     let selectedId= e.target.name
    //     let currentQuestion= questionsList.find((ques) => ques.id ==selectedId)
    //     let updatedChoices = [currentQuestion.option[0],e.target.value,currentQuestion.option[2]]
    //     let updatedQuestion= {
    //         id: currentQuestion.id,
    //         question: currentQuestion.questionInput,
    //         questionType: currentQuestion.inputType,
    //         option:updatedChoices,
    //     }
    //     const updatedArray = questionsList.map((ques) => {
    //
    //         if (ques.id ==selectedId) {
    //
    //             return updatedQuestion
    //         }
    //
    //         return ques;
    //     })
    //     setQuestionsList(updatedArray);
    // }
    // let handleChoice3Change=(e)=>{
    //     let selectedId= e.target.name
    //     let currentQuestion= questionsList.find((ques) => ques.id ==selectedId)
    //     let updatedChoices = [currentQuestion.option[0],currentQuestion.option[1],e.target.value]
    //     console.log(updatedChoices)
    //     let updatedQuestion= {
    //         id: currentQuestion.id,
    //         question: currentQuestion.questionInput,
    //         questionType: currentQuestion.inputType,
    //         option:updatedChoices,
    //     }
    //     const updatedArray = questionsList.map((ques) => {
    //
    //         if (ques.id ==selectedId) {
    //
    //             return updatedQuestion
    //         }
    //
    //         return ques;
    //     })
    //     setQuestionsList(updatedArray);
    // }

    let handleEditSubmit=(e)=>{
        e.preventDefault();

        let user={id: props.userid,userInfo:currentUser.userInfo, questions:questionsList }
        updateUserQAPIMethod(user).then((response) => {
           console.log(response)
        })
    }



    return(
        <>
            {isLoading &&<div>Loading...</div> }
            {!isLoading &&  <div className="edit-page">
            <div className={"edit-header"}>
                <div className={"edit-title"}>Edit Questions</div>
                <button onClick={handleAddClick}>+</button>
            </div>
            {questionsList.map((ques)=>(
            <div className="input-instance" >
                <form  action="#">
                    <input id={ques.id} type="text" className={"edit-input"} onChange={handleInputChange} value={ques.question}/>
                    <div className="select-and-delete">
                    <select name={ques.id} id="question-types" onChange={handleSelectChange} value={ques.questionType}>
                        <option value="number">number</option>s
                        <option value="boolean">boolean</option>
                        <option value="text">text</option>
                        <option value="multiple-choice">multiple choice</option>

                    </select>
                        <button className="edit-delete-button" value={ques.id} onClick={handleDeleteClick}>delete </button>

                    </div>


                    {ques.questionType==="multiple-choice" && <div>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} id={"first-option"} onChange={handleOptionChange} name={ques.id} value={ques.option[0]} /><br/>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} id={"second-option"} onChange={handleOptionChange}  name={ques.id} value={ques.option[1]} /><br/>
                        <input type="radio" disabled/>
                        <input type="text" className={"radio-choice"} id={"third-option"} onChange={handleOptionChange} name={ques.id} value={ques.option[2]} /><br/>
                    </div>}

                </form>
            </div>
            ))}
            {questionsList.length>0 &&
                <button type={"submit"} id={"edit-submit-button"} onClick={handleEditSubmit}>Save</button>
            }
        </div>}

        </>
    );
}

export default EditQuestion;