import React from "react";
import { useDispatch } from "react-redux";

import { stepForward } from "../../../../redux/Slices/RegisterSlice";
import { AppDispatch } from "../../../../redux/Store";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import './RegisterFormTwo.css';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

export const RegisterFormTwo:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();

    const nextStep = () => {
        dispatch(stepForward());
    }

    return (
        <div className="reg-step-two-container">
            <div className="reg-step-two-content">
                <h1 className="reg-step-two-header">
                    Настройте свой опыт
                </h1>
                <h3 className="reg-step-two-sub-header">
                    Оговорка о конфиденциальности.
                </h3>
                <div className="reg-step-two-toggle-group">
                    <p className="reg-step-two-privacy">
                        При использовании Вами Сервисов передача Персональной информации осуществляется c Вашего согласия, выражающего свободную волю и Ваш интерес.
                        Ваши персональные данные надежно защищены и не будут переданы третьим лицам.
                    </p>
                    <Checkbox />
                </div>
                <p className="reg-step-two-policy">
                    Регистрируясь и/или авторизуясь на сайте, Вы соглашаетесь с <span className="reg-step-two-link">Правилами пользования Платформой</span>, <span className="reg-step-two-link">Политикой конфиденциальности</span> и <span className="reg-step-two-link">Использованием куки</span>. <strong>Вблог</strong> может использовать Ваши контактные данные, включая адрес электронной почты, телефон для целей, 
                    указанных в Политике конфиденциальности. <span className="reg-step-two-link">Узнать больше</span>
                </p>
            </div>
            <StyledNextButton active={true} color={'black'} onClick={nextStep}>Далее</StyledNextButton>
        </div>
    );
};