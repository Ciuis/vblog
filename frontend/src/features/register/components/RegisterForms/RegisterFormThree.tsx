import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/Store";

import { stringifyBirthDate } from "../../../../utils/DateUtils";
import { ValidatedDisplay } from "../../../../components/ValidInputs/ValidatedDisplay";

import './RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormThree:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header">Создайте свой аккаунт</h1>
                <div className="register-three-value-wrapper">
                    <ValidatedDisplay label={"Name"} value={`${state.firstName} ${state.lastName}`} />
                </div>
                <div className="register-three-value-wrapper">
                    <ValidatedDisplay label={"Email"} value={state.email} />
                    {state.error ? 
                        <p className="register-error color-red">Электронная почта уже занята. Пожалуйста, используйте другой адрес.</p> :
                        <></>
                    }
                </div>
                <div className={state.error ? "register-three-value-wrapper" : "register-three-bottom"}>
                    <ValidatedDisplay label={"Birth date"} value={stringifyBirthDate(state.birthDate)} />    
                </div>
                <p className="register-text-sm color-gray">
                    Продолжая Вы соглашаетесь с <span className="register-link color-blue">Правилами пользования платформой</span> и <span className="register-link color-blue">Политикой конфиденциальности</span>, включая <span className="register-link color-blue">Политику использования куки</span>.
                    Вблог может использовать Вашу контактную информацию, включая адрес электронной почты и номер телефона для целей, указанных в Политике конфиденциальности, таких как обеспечение безопасности аккаунта, персонализации сервисов, а также рекламы. <span className="register-link color-blue">Узнать больше</span>. Другие смогут найти Вас по адресу электронной почты или номеру телефона, если вы не укажете иного <span className="register-link color-blue">здесь</span>.
                </p>
            </div>
        </div>
    )
}