import React from "react";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";

import './ForgotForms.css';
import '../../../../assets/global.css';

interface ForgotFormThreeProperties {
    updateCode: (value:number) => void;
    valid: boolean;
}

export const ForgotFormThree:React.FC<ForgotFormThreeProperties> = ({updateCode, valid}) => {
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateCode(+e.target.value);
    }
    
    return (
        <div className="forgot-form-container">
            <h1 className="forgot-form-header">Мы отправили вам код</h1>
            <p className="forgot-form-text color-gray">Проверьте свою электронную почту. Если необходим новый, вернитесь на шаг назад.</p>
            <ValidatedTextInput
                valid={valid}
                name={"code"}
                label={"Введите полученный код"}
                changeValue={handleChange}
            />
        </div>
    )
}