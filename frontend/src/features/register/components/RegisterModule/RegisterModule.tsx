import React from 'react'
import { Module } from '../../../../components/module/Module'
import { RegisterNavigator } from '../RegisterNavigator/RegisterNavigator';

import './RegisterModule.css';

export const RegisterModule: React.FC = () => {
  return (
    <Module>
      <div className='register-container'>
        <RegisterNavigator step={2}/>
      </div>
    </Module>
  )
}