import React, {useState} from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../../redux/Store";

import './RegisterEmailInput.css';

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import {validateEmail} from "../../../../services/Validators";

interface RegisterEmailInputProperties {
    email: string;
}

export const RegisterEmailInput:React.FC<RegisterEmailInputProperties> = ({email}) => {
    const [isValidEmail, SetIsValidEmail] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();

    const updateEmail = (e:React.ChangeEvent<HTMLInputElement>):void => {
        dispatch(updateRegister({
            name: 'email',
            value:e.target.value
        }));

        let valid = validateEmail(e.target.value);
        SetIsValidEmail(valid);

        dispatch(updateRegister({
            name: 'isValidEmail',
            value: valid
        }))
    }

    return (
        <div className="register-email-input">
            <ValidatedTextInput data={email} valid={isValidEmail} label={'Email'} name={'email'} changeValue={updateEmail} />
            {isValidEmail ? <></> : <span className="register-email-error">Please enter a valid email address</span>}
        </div>
    )
}