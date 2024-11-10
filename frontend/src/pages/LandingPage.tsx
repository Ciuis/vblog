import React from 'react';

import './LandingPage.css';
import '../assets/global.css';
import { RegisterModule } from '../features/register/components/RegisterModule/RegisterModule';

export const LandingPage:React.FC = () => {
  return (
    <div className="home-container">
        <RegisterModule />
    </div>
  )
}
