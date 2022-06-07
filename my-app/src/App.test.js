import {cleanup, render, screen} from '@testing-library/react';
import App from "./App";
import LoginForm from "./components/loginPage/LoginForm";
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
