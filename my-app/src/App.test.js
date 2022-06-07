import {cleanup, render, screen} from '@testing-library/react';
import App from "./App";
import Banner from './components/Banner';
import EditQuestion from './components/editQuestionPage/EditQuestion';
import DateOption from './components/logDataPage/DateOption';
import LoginForm from "./components/loginPage/LoginForm";
import Signup from './components/loginPage/Signup';
import ProfilePic from "./components/profilePage/ProfilePic";


afterEach(cleanup)

it('should take a snapshot', () => {
  const { asFragment } = render(<App />)

  expect(asFragment(<App />)).toMatchSnapshot()
})

it('Renders the fields in login page', () => {
  const { getByTestId } = render(<LoginForm />);
  expect(getByTestId('email-input')).toBeInTheDocument()
});


it('Check if there is profile pic', () => {
  const { getByTestId } = render(<ProfilePic />);
  expect(getByTestId('profile-pic')).toBeInTheDocument()
});


it('Check if selected Date on logdata is rendered', () => {
  const { getByTestId } = render(<DateOption />);
  expect(getByTestId('selected-date')).toBeInTheDocument()
});

it('Check if adding questions is available', () => {
  const { getByTestId } = render(<EditQuestion />);
  expect(getByTestId('add-question')).toBeInTheDocument()
});

it('Check if the top Banner redners', () => {
  const { getByTestId } = render(<Banner />);
  expect(getByTestId('banner')).toBeInTheDocument()
});

