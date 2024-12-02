import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/Store';
import { resetUsername } from '../redux/Slices/UserSlice';

import RegisterModule from '../features/register';
import { RightSideBar, LandingFooter } from '../features/landing';
import ForgotPasswordModule from '../features/forgotpassword';
import LoginModule from '../features/login';

import './LandingPage.css';
import '../assets/global.css';


export const LandingPage:React.FC = () => {

  const dispatch:AppDispatch = useDispatch();

  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const toggleRegister = () => {
    setRegister(!register);
  }

  const toggleLogin = () => {
    setLogin(!login);
    dispatch(resetUsername());
  }

  const toggleForgotPassword = () => {
    setLogin(false);
    setForgotPassword(!forgotPassword);
  }

  return (
    <div className="home-container bg-color">
        {register ? <RegisterModule toggleModule={toggleRegister}/> : <></>}
        {login ? <LoginModule toggleModule={toggleLogin} toggleRegister={toggleRegister} toggleForgot={toggleForgotPassword}/> : <></>}
        {forgotPassword ? <ForgotPasswordModule toggleModule={toggleForgotPassword}/> : <></>}
        <div className='landing-layout'>
          <div className='landing-top-left'>
          </div>
          <div className='landing-top-right'>
            <RightSideBar toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
          </div>
          <div className='landing-bottom'>
            <LandingFooter />
          </div>
        </div>
    </div>
  )
}
