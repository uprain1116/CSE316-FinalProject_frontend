import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginPage/Login";
import EditQuestion from "./components/editQuestionPage/EditQuestion";
import LogData from "./components/logDataPage/LogData";
import ViewData from "./components/viewDataPage/ViewData";
import Profile from "./components/profilePage/Profile";
import Admin from "./components/adminPage/Admin";
import Banner from "./components/Banner";
import './App.css';



function App() {
  return (
    <>
      <BrowserRouter>
        <Banner/>
        <Routes>
          <Route path = '/' element = {<Login/>}> </Route>
          <Route path = '/logData' element = {<LogData/>}> </Route>
          <Route path = '/editQ' element = {<EditQuestion/>}> </Route>
          <Route path = '/viewData' element = {<ViewData/>}> </Route>
          <Route path = '/profile' element = {<Profile/>}> </Route>
          <Route path = '/admin' element = {<Admin/>}> </Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
