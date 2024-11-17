import React from 'react';

import RegisterModule from '../features/register';

import './LandingPage.css';
import '../assets/global.css';

export const LandingPage:React.FC = () => {
  return (
    <div className="home-container bg-color">
        <RegisterModule />
    </div>
  )
}
