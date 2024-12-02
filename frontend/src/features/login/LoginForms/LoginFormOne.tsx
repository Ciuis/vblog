import React, {useState} from "react";

import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { verifyUsername } from "../../../redux/Slices/UserSlice";

import { ValidatedTextInput } from "../../../components/ValidInputs/ValidatedTextInput";
import { ModuleButton } from "../../../components/ModuleButton/ModuleButton";
import { validateEmail, validatePhone } from "../../../services/Validators";

import gos from '../../../assets/gos.png';
import vk from '../../../assets/vk.png';

import './LoginForms.css';
import '../../../assets/global.css';

interface LoginFormOnePropeerties {
    noAccount: () => void;
    forgot: () => void;
}

export const LoginFormOne:React.FC<LoginFormOnePropeerties> = ({noAccount, forgot}) => {

    const state = useSelector((state:RootState) => state.user);

    const dispatch:AppDispatch = useDispatch();

    const [credential, setCredential] = useState<string>('');

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setCredential(e.target.value);
    }

    const findUsername = ():void => {
        let body = {
            email: '',
            phone: '',
            username: ''
        };

        if (validateEmail(credential)) {
            body.email = credential;
        } else if (validatePhone(credential)) {
            body.phone = credential;
        } else {
            body.username = credential;
        }

        dispatch(verifyUsername(body));
    }

    return(
        <div className="login-form-one-container">
            <h1 className="login-form-header">
                Зайти в Вблог
            </h1>
            <ModuleButton
                active={true}
                height={40}
                fontColor={'#536471'}
                borderColor={'#536371'}
                backgroundColor={'white'}
                fontSize={15}
                fontWeight={600}
                hoverBackground={{
                    r: 179,
                    g: 204,
                    b: 255,
                    a: .05
                }}
                hoverBorder={{
                    r: 128,
                    g: 170,
                    b: 255,
                    a: .5
                }}
            >
                <img className="login-form-one-buttons-logo" src={vk} />
                Зайти с помощью VK
            </ModuleButton>
            <ModuleButton
                active={true}
                height={40}
                fontColor={'#black'}
                borderColor={'#536371'}
                backgroundColor={'white'}
                fontSize={16}
                fontWeight={700}
                hoverBackground={{
                    r: 87,
                    g: 87,
                    b: 87,
                    a: .1
                }}
                hoverBorder={{
                    r: 128,
                    g: 170,
                    b: 255,
                    a: 1
                }}
            >
                <img className="login-form-one-buttons-logo" src={gos} />
                Зайти с помощью Госуслуг
            </ModuleButton>
            <div className="login-form-one-divider">
                <div className="login-from-one-line"></div>
                <p className="login-form-one-or">или</p>
                <div className="login-from-one-line"></div>
            </div>
            <ValidatedTextInput
                valid={!state.error}
                name={'identifier'}
                label={'Phone, email or username'}
                changeValue={handleChange}
            />
            {state.error ? <p className="login-form-error color-red">Пользователь не найден</p> : <></>}
            <ModuleButton
                active={true}
                height={40}
                fontColor={'white'}
                backgroundColor={'black'}
                fontSize={16}
                fontWeight={700}
                hoverBackground={{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: .9
                }}
                onClick={findUsername}
            >
                Далее
            </ModuleButton>
            <ModuleButton
                active={true}
                height={40}
                fontColor={'black'}
                borderColor={'#D3D3D3'}
                backgroundColor={'white'}
                fontSize={16}
                fontWeight={700}
                hoverBackground={{
                    r: 83,
                    g: 100,
                    b: 113,
                    a: .2
                }}
                hoverBorder={{
                    r: 211,
                    g: 211,
                    b: 211,
                    a: 1.0
                }}
                onClick={forgot}
            >
                Забыли пароль?
            </ModuleButton>
            <p className="login-form-one-text color-gray">У вас нет аккаунта? <span className="link color-blue" onClick={noAccount}>Зарегистрироваться</span></p>
        </div>
    );
};