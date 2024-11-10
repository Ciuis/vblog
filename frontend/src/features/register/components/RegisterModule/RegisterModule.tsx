import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';

import { stepBackward } from '../../../../redux/Slices/RegisterSlice';
import { Module } from '../../../../components/Module/Module'
import { RegisterNavigator } from '../RegisterNavigator/RegisterNavigator';
import { determineModuleContent } from '../../utils/RegisterModuleUtils';

import './RegisterModule.css';

export const RegisterModule: React.FC = () => {

  const state = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const stepBtnOnClick = () => {
    dispatch(stepBackward());
  }

  return (
    <Module>
      <div className='register-container'>
        <RegisterNavigator step={state.step} changeStep={stepBtnOnClick}/>
        <div className='reg-module-content'>
          {determineModuleContent(state.step)}
        </div>
      </div>
    </Module>
  )
}