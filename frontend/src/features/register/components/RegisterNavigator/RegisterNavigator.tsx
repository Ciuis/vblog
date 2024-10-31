import React from 'react'

import {displayIcon} from '../../utils/RegisterNavigatorUtils';
import './RegisterNavigator.css';

interface RegisterNavigatorProperties {
    step: number;
}

export const RegisterNavigator: React.FC<RegisterNavigatorProperties> = ({step}) => {
  return (
    <div className='reg-nav-container'>
        <div className='reg-nav-btn'>
            {displayIcon(step)}
        </div>
        <span className='reg-nav-number'> Step {step} of 6 </span>
    </div>
  )
}