import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../../../redux/Store";

import { registerUser } from "../../../../redux/Slices/RegisterSlice";
import { stringifyBirthDate } from "../../../../utils/DateUtils";
import { ValidatedDisplay } from "../../../../components/ValidInputs/ValidatedDisplay";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import './RegisterFormThree.css';

export const RegisterFormThree:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const submitUser = () => {
        const user = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            birthDate: `${state.birthDate.year}-${state.birthDate.month.toString().padStart(2, '0')}-${state.birthDate.day.toString().padStart(2, '0')}`
        }

        console.log("Trying to register user");

        dispatch(registerUser(user));
    }

    return (
        <div className="reg-step-three-container">
            <div className="reg-step-three-content">
                <h1 className="reg-step-three-header">Создайте свой аккаунт</h1>
                <div className="reg-step-three-value">
                    <ValidatedDisplay label={"Name"} value={`${state.firstName} ${state.lastName}`} />
                </div>
                <div className="reg-step-three-value">
                    <ValidatedDisplay label={"Email"} value={state.email} />
                    {state.error ? 
                        <p className="reg-step-three-error">Электронная почта уже занята. Пожалуйста, используйте другой адрес.</p> :
                        <></>
                    }
                </div>
                <div className="reg-step-three-value">
                    <ValidatedDisplay label={"Birth date"} value={stringifyBirthDate(state.birthDate)} />    
                </div>
                <p className="reg-step-three-policy">
                    Продолжая Вы соглашаетесь с <span className="reg-step-three-link">Правилами пользования платформой</span> и <span className="reg-step-three-link">Политикой конфиденциальности</span>, включая <span className="reg-step-three-link">Политику использования куки</span>.
                    Вблог может использовать Вашу контактную информацию, включая адрес электронной почты и номер телефона для целей, указанных в Политике конфиденциальности, таких как обеспечение безопасности аккаунта, персонализации сервисов, а также рекламы. <span className="reg-step-three-link">Узнать больше</span>. Другие смогут найти Вас по адресу электронной почты или номеру телефона, если вы не укажете иного <span className="reg-step-three-link">здесь</span>.
                </p>
            </div>
            <StyledNextButton onClick={submitUser} color={"blue"} active={true}>Продолжить регистрацию</StyledNextButton>
        </div>
    )
}