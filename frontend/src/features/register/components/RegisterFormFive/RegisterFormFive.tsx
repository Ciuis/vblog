import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../../../redux/Store";
import { resendEmail, verifyEmail } from "../../../../redux/Slices/RegisterSlice";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import './RegisterFormFive.css';

export const RegisterFormFive:React.FC = () => {
    
    const state = useSelector((state:RootState) => state.register);

    const dispatch:AppDispatch = useDispatch();

    const [code, setCode] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const resend = () => {
        dispatch(
            resendEmail(state.username)
        )
    };

    const verify = () => {
        dispatch(
            verifyEmail({
                username: state.username,
                code
            })
        )
    }
    
    return (
        <div className="reg-step-five-container">
            <div className="reg-step-five-content">
                <h1>Мы отправили Вам код подтверждения адреса электронной почты</h1>
                <p>Введите его ниже для подтверждения {state.email}</p>
                <ValidatedTextInput valid={true} name={"code"}
                    label={"Verification code"} changeValue={handleChange}/>
                <p className="reg-step-five-message" onClick={resend}>Не получили письмо?</p>
            </div>
            <StyledNextButton active={code ? true : false} disabled={code ? false : true} color={"balck"}
                    onClick={verify}>Далее</StyledNextButton>
        </div>
    )
}