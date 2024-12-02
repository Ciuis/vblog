import React from "react";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";

import './ForgotForms.css';
import '../../../../assets/global.css';

interface ForgotFromOneProperties {
    setCredential: (name:string) => void;
    error: boolean;
}

export const ForgotFromOne:React.FC<ForgotFromOneProperties> = ({setCredential, error}) => {
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCredential(e.target.value);
    }
    
    return (
        <div className="forgot-form-container">
            <h1 className="forgot-form-header">
                Найдите свой аккаунт
            </h1>
            <p className="forgot-form-text color-gray">
                Введите свой адрес электронной почты, имя пользователя или телефон, связанныые с аккаунтом для смены пароля.
            </p>
            <ValidatedTextInput
                valid={!error}
                name={"Forgot"}
                label={"Email, phone or username"}
                changeValue={handleChange}
            />
            {error ? <p className="color-red forgot-error">Пользователь не найден</p> : <></>}
        </div>
    )
}