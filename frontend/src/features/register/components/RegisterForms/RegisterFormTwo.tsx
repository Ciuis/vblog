import React from "react";

import { Checkbox } from '../../../../components/Checkbox/Checkbox';

import '../../../../assets/global.css';
import './RegisterForm.css';

export const RegisterFormTwo:React.FC = () => {

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header">
                    Настройте свой опыт
                </h1>
                <h3 className="register-subheader">
                    Оговорка о конфиденциальности.
                </h3>
                <div className="register-two-checkbox-wrapper">
                    <p className="register-text">
                        При использовании Вами Сервисов передача Персональной информации осуществляется c Вашего согласия, выражающего свободную волю и Ваш интерес.
                        Ваши персональные данные надежно защищены и не будут переданы третьим лицам.
                    </p>
                    <Checkbox />
                </div>
                <p className="register-text color-gray">
                    Регистрируясь и/или авторизуясь на сайте, Вы соглашаетесь с <span className="register-link color-blue">Правилами пользования Платформой</span>, <span className="register-link color-blue">Политикой конфиденциальности</span> и <span className="register-link color-blue">Использованием куки</span>. <strong>Вблог</strong> может использовать Ваши контактные данные, включая адрес электронной почты, телефон для целей, 
                    указанных в Политике конфиденциальности. <span className="register-link color-blue">Узнать больше</span>
                </p>
            </div>
        </div>
    );
};