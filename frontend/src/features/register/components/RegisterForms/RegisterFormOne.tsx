import React from 'react'

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';

import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';
import { RegisterNameInputs } from '../RegisterNameInput/RegisterNameInputs';
import { RegisterEmailInput } from '../RegisterEmailInput/RegisterEmailInput';

import './RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormOne: React.FC = () => {

  const registerState = useSelector((state:RootState) => state.register);

  return (
    <div className='register-container'>
      <div className='register-content'>
        <h1 className='register-header'>Создание аккаунта</h1>
        <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>
        <RegisterEmailInput email={registerState.email}/>
        <div className='register-one-birhdate-wrapper'>
          <h4 className='register-h4'>Дата рождения</h4>
          <span className='register-text-sm color-gray'>
            Эта информация не будет отображаться публично. Подтвердите реальный возраст, даже если это бизнес-аккаунт или аккаут домашнего животного.
          </span>
        </div>
        <RegisterDateInput date={registerState.birthDate}/>
      </div>
    </div>
  )
}