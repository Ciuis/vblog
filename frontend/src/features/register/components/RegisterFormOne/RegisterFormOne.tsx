import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';

import './RegisterFormOne.css'

import { stepForward, updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';
import { RegisterNameInputs } from '../RegisterNameInput/RegisterNameInputs';
import { RegisterEmailInput } from '../RegisterEmailInput/RegisterEmailInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';

export const RegisterFormOne: React.FC = () => {

    const registerState = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [buttonActive, setButtonActive] = useState<boolean>(false);

    const nextPage = () => {
      dispatch(updateRegister({
        name: "error",
        value: false
      }));
      
      dispatch(stepForward());
    }

    useEffect (() => {

      if (registerState.isValidBirthDate && registerState.isValidEmail && registerState.isValidFirstName && registerState.isValidLastName) {
        setButtonActive(true);
      } else setButtonActive(false);
 
    }, [registerState]);

  return (
    <div className='reg-step-one-container'>
      <div className='reg-step-one-content'>
        <h1 className='reg-step-one-header'>Создание аккаунта</h1>
        <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>
        <RegisterEmailInput email={registerState.email}/>
        <div className='reg-step-one-birhdate-diclaimer'>
          <p className='reg-step-one-birthdate-header'>Дата рождения</p>
          <span className='reg-step-one-birthdate-text'>
            Эта информация не будет отображаться публично. Подтвердите реальный возраст, даже если это бизнес-аккаунт или аккаут домашнего животного.
          </span>
        </div>
        <RegisterDateInput date={registerState.birthDate}/>
      </div>
      <StyledNextButton
        disabled={!buttonActive}
        color={'black'}
        active={buttonActive}
        onClick={nextPage}>
          Далее
        </StyledNextButton>
    </div>
  )
}