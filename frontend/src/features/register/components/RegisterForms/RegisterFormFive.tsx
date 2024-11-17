import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../../../redux/Store";
import { resendEmail, updateRegister } from "../../../../redux/Slices/RegisterSlice";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";

import './RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormFive:React.FC = () => {
    
    const state = useSelector((state:RootState) => state.register);

    const dispatch:AppDispatch = useDispatch();

    const [code, setCode] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        dispatch(updateRegister({
            name: "code",
            value: e.target.value
        }));
    }

    const resend = () => {
        dispatch(
            resendEmail(state.username)
        )
    };
    
    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header-2">Мы отправили Вам код подтверждения адреса электронной почты</h1>
                <p className="register-text color-gray">Введите его ниже для подтверждения {state.email}</p>
                <div className="register-five-input-wrapper">
                    <ValidatedTextInput valid={true} name={"code"}
                        label={"Verification code"} changeValue={handleChange}/>
                    <p className="register-five-message color-blue" onClick={resend}>Не получили письмо?</p>
                </div>
            </div>
        </div>
    )
}