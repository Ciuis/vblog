import React, {useState} from "react";

import { ForgotRadioButton } from "../ForgotRadioButton/ForgotRadioButton";

import './ForgotForms.css';
import '../../../../assets/global.css';

interface ForgotFormTwoProperties {
    email: string;
    phone: string;
}

export const ForgotFormTwo:React.FC<ForgotFormTwoProperties> = ({email, phone}) => {

    const [emailActive, setEmailActive] = useState<boolean>(false);
    const [phoneActive, setPhoneActive] = useState<boolean>(false);

    const handleEmailClick = () => {
        setEmailActive(true);
        setPhoneActive(false);
    }

    const handlePhoneClick = () => {
        setPhoneActive(true);
        setEmailActive(false);
    }

    const transformEmail = (email:string): string => {
        const atIndex = email.indexOf('@');
        const dotIndex = email.indexOf('.', atIndex);

        const maskedEmail = email.slice(0, 2) + '*'.repeat(atIndex - 2);
        const maskedDomain = email.slice(atIndex, atIndex + 2) + '*'.repeat(dotIndex - atIndex - 2);

        return maskedEmail + maskedDomain + email.slice(dotIndex);
    }

    return (
        <div className="forgot-form-container">
            <h1 className="forgot-form-header">
                Куда отправить код подтверждения?
            </h1>
            <p className="forgot-form-text color-gray">
                Прежде, чем вы сможете изменить пароль, нам необходимо подтвердить, что вы это вы.
            </p>
            <p className="forgot-form-text color-gray">
                Для начала выберите куда отправить код подтверждения.
            </p>
            <div className="forgot-form-two-select-group">
                <p className="forgot-form-two-select-text">Отправить электронное письмо на {transformEmail(email)}</p>
                <ForgotRadioButton clicked={emailActive} handleClick={handleEmailClick}/>
            </div>
            <div className="forgot-form-two-select-group">
                <p className="forgot-form-two-select-text">Отправить код на номер телефона, заканчивающийся на {phone.substring(phone.length - 2, phone.length)}</p>
                <ForgotRadioButton clicked={phoneActive} handleClick={handlePhoneClick}/>
            </div>
        </div>
    )
}