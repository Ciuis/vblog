import React, {useState} from 'react';

import { useSelector, UseSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';

import { ValidatedTextInput } from '../../../components/ValidInputs/ValidatedTextInput';
import { DisabledValidatedInput } from '../../../components/ValidInputs/DisbleValidatedInput';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { VisibilityOffOutlined } from '@mui/icons-material';

import './LoginForms.css';

interface LoginFormTwoProperties {
    setPassword: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormTwo:React.FC<LoginFormTwoProperties> = ({setPassword}) => {

    const state = useSelector((state:RootState) => state.user);

    const [active, setActive] = useState<boolean>(false);

    const toggleView = () => {
        setActive(!active);
    }

    return (
        <div className='login-form-two-container'>
            <div className='login-form-two-content'>
                <h1 className='login-form-header'>Веедите пароль</h1>
                <DisabledValidatedInput
                    label={'username'}
                    value={state.username}
                />
                <div className='login-form-two-password'>
                    <ValidatedTextInput
                        valid={!state.error}
                        label={'Password'}
                        name={'password'}
                        changeValue={setPassword}
                        attributes={{
                            minLength: 8,
                            type: active ? 'text' : 'password'
                        }}
                    />
                    <div onClick = {toggleView} className='login-form-two-password-icon'>
                        {active ? 
                                <VisibilityOffOutlined sx = {{
                                    fontSize: '24px'
                                }}/> :
                                <VisibilityOutlinedIcon sx = {{
                                    fontSize: '24px'
                                }} />
                        }
                    </div>
                    {state.error ? <p className='login-form-error color-red'>Неверный пароль</p> : <></>}
                    <p className='login-form-two-forgot color-blue'>Забыли пароль?</p>
                </div>
            </div>
        </div>
    );
}