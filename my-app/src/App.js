import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginPage/Login";
import EditQuestion from "./components/editQuestionPage/EditQuestion";
import LogData from "./components/logDataPage/LogData";
import ViewData from "./components/viewDataPage/ViewData";
import Profile from "./components/profilePage/Profile";
import Admin from "./components/adminPage/Admin";
import Banner from "./components/Banner";
import { RenderIf } from "./components/RenderIf";
import './App.css';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>}> </Route>
          <Route path = '/logData' element = {<> <Banner/> <LogData/> </>}> </Route>
          <Route path = '/editQ' element = {<> <Banner/> <EditQuestion/> </>}> </Route>
          <Route path = '/viewData' element = {<> <Banner/> <ViewData/> </>}> </Route>
          <Route path = '/profile' element = {<> <Banner/> <Profile/> </>}> </Route>
          <Route path = '/admin' element = {<> <Banner/> <Admin/> </>}> </Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
