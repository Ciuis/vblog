import React from 'react'

import {displayIcon, stepBtnVisibility} from '../../utils/RegisterNavigatorUtils';
import './RegisterNavigator.css';

interface RegisterNavigatorProperties {
    step: number;

    changeStep(): void
}

export const RegisterNavigator: React.FC<RegisterNavigatorProperties> = ({step, changeStep}) => {
  return (
    <div className='reg-nav-container'>
        <div className={stepBtnVisibility(step)} onClick={changeStep}>
            {displayIcon(step)}
        </div>
        <span className='reg-nav-number'> Step {step} of 6 </span>
    </div>
  )
}