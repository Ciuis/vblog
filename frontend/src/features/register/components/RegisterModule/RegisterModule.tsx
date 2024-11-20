import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';

import { cleanRegisterState, stepBackward } from '../../../../redux/Slices/RegisterSlice';
import { Module } from '../../../../components/Module/Module';
import { RegisterNavigator } from '../RegisterNavigator/RegisterNavigator';
import { determineModuleContent } from '../../utils/RegisterModuleUtils';
import { RegisterNextButton } from '../RegisterNextButton/RegisterNextButton';

import './RegisterModule.css';

interface RegisterModuleProperties {
  toggleModule: () => void;
}

export const RegisterModule: React.FC<RegisterModuleProperties> = ({toggleModule}) => {

  const state = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const stepBtnOnClick = () => {
    if (state.step === 1) {
      toggleModule();
    }
    dispatch(stepBackward());
  }

  useEffect(() => {
    return(() => {
      dispatch(cleanRegisterState());
    });
  }, []);

  return (
    <Module 
      topContent={<RegisterNavigator step={state.step} changeStep={stepBtnOnClick}/>} 
      content={determineModuleContent(state.step)} 
      bottomContent={<RegisterNextButton step={state.step}/>}
    />
  )
}