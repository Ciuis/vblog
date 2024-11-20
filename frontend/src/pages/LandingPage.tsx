import React, {useState} from 'react';

import RegisterModule from '../features/register';
import { RightSideBar, LandingFooter } from '../features/landing';

import './LandingPage.css';
import '../assets/global.css';

export const LandingPage:React.FC = () => {

  const [register, setRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setRegister(!register);
  }

  return (
    <div className="home-container bg-color">
        {register ? <RegisterModule toggleModule={toggleRegister}/> : <></>}
        <div className='landing-layout'>
          <div className='landing-top-left bg-blue'>
          </div>
          <div className='landing-top-right'>
            <RightSideBar toggleLogin={() => {}} toggleRegister={toggleRegister} />
          </div>
          <div className='landing-bottom'>
            <LandingFooter />
          </div>
        </div>
    </div>
  )
}
