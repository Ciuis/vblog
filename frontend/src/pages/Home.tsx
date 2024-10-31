import React from 'react';

import './Home.css';
import '../assets/global.css';
import { RegisterModule } from '../features/register/components/RegisterModule/RegisterModule';

export const Home:React.FC = () => {
  return (
    <div className="home-container bg-color">
        <RegisterModule />
    </div>
  )
}
