import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/loginPage/Login";
import EditQuestion from "./components/editQuestionPage/EditQuestion";
import LogData from "./components/logDataPage/LogData";
import ViewData from "./components/viewDataPage/ViewData";
import Profile from "./components/profilePage/Profile";
import Admin from "./components/adminPage/Admin";
import Banner from "./components/Banner";
import { RenderIf } from "./components/RenderIf";
import './App.css';
import { useState, useEffect } from "react";
import { getSessionAPIMethod } from "./api/client";




function App() {
  const [userID, setUserID] = useState('');
  const setCurrentUser = (currentUser) => {
    console.log('current User', currentUser);
    setUserID(currentUser);
  }

  useEffect(() => {
    getSessionAPIMethod().then((value) => {
      setUserID(value);
    }).catch((err) => {
    });
}, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login setCurrentUser = {setCurrentUser} />}> </Route>
          {userID === undefined || userID === null || userID === ''? 
            <Route path = '*' element = {<Navigate to = "/"/>}/>
          :
          <>
            <Route path = '/logData' element = {<> <Banner userid = {userID} /> <LogData userid = {userID}/> </>}> </Route>
            <Route path = '/editQ' element = {<> <Banner userid = {userID}/> <EditQuestion userid = {userID}/> </>}> </Route>
            <Route path = '/viewData' element = {<> <Banner userid = {userID}/> <ViewData/> </>}> </Route>
            <Route path = '/profile' element = {<> <Banner userid = {userID}/> <Profile userid = {userID}/> </>}> </Route>
            <Route path = '/admin' element = {<> <Banner userid = {userID}/> <Admin/> </>}> </Route> 
          </>
          }

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
