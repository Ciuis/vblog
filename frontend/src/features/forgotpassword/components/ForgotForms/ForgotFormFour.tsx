import React, {useState} from "react";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import './ForgotForms.css';
import '../../../../assets/global.css';

interface ForgotFormFourProperties {
    updatePassword: (e:React.ChangeEvent<HTMLInputElement>) => void;
    matching: boolean;
}

export const ForgotFormFour:React.FC<ForgotFormFourProperties> = ({updatePassword, matching}) => {
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    const [confirmToggle, setConfirmToggle] = useState<boolean>(false);

    const togglePassword = () => {
        setPasswordToggle(!passwordToggle);
    };

    const toggleConfirm = () => {
        setConfirmToggle(!confirmToggle);
    };

    return (
        <div className="forgot-form-container">
            <h1 className="forgot-form-header">Введите новый пароль</h1>
            <p className="forgot-form-text color-gray">Пароль должен состоять как минимум из 8 символов. Для большей безопасности используйте комбинацию цифр, букв, знаков препинания <span  className="link color-blue">в новом пароле</span></p>
            <p className="forgot-form-text color-gray">После смены пароля все активные сессии будут завершены.</p>
            <div className="forgot-form-four-password-wrapper">
                <ValidatedTextInput
                    valid={true}
                    label={"Password"}
                    name={"password"}
                    attributes={{
                        minLength: 8,
                        type: passwordToggle ? "text" : "password"
                    }}
                    changeValue={updatePassword}
                />
                <div onClick={togglePassword} className="forgot-form-four-password-icon">
                    {passwordToggle ? 
                        <VisibilityOffOutlinedIcon sx={{
                            fontSize: "24px"
                        }} /> : 
                        <VisibilityOutlinedIcon sx={{
                            fontSize: "24px"
                        }} />
                    }
                </div>
            </div>
            <div className="forgot-form-four-password-wrapper">
                <ValidatedTextInput
                    valid={matching ? true : false}
                    label={"Confirm password"}
                    name={"confirm"}
                    attributes={{
                        minLength: 8,
                        type: confirmToggle ? "text" : "password"
                    }}
                    changeValue={updatePassword}
                />
                <div onClick={toggleConfirm} className="forgot-form-four-password-icon">
                    {confirmToggle ? 
                        <VisibilityOffOutlinedIcon sx={{
                            fontSize: "24px"
                        }} /> : 
                        <VisibilityOutlinedIcon sx={{
                            fontSize: "24px"
                        }} />
                    }
                </div>
            </div>
            {!matching ? <p className="login-form-error color-red">Пароль должен совпадать</p> : <></>}
        </div>
    )
}