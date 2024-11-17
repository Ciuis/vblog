import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";

import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";
import { countryCodeDropDown } from "../../utils/RegisterModuleUtils";
import { validatePhone } from "../../../../services/Validators";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";

import './RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormFour:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);

    const [phoneCode, setPhoneCode] = useState<string>("+7");
    const [phone, setPhone] = useState<string>("");
    const [validNumber, setValidNumber] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();

    const changeCode = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setPhoneCode(e.target.value.split(" ")[0]);
    }

    const changePhone = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        dispatch(updateRegister({
            name: "phone",
            value: e.target.value
        }))
    }

    useEffect(() => {

        if(phone) {
            setValidNumber(validatePhone(phone));
            dispatch(updateRegister({
                name: "isValidPhone",
                value: validatePhone(phone)
            }));
        }

    }, [phoneCode, phone])

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header-2">Добавьте номер телефона</h1>
                <p className="register-text color-gray">Укажите номер телефона, который вы хотите связать с аккаунтом</p>
                <div className={validNumber ? "register-four-input-wrapper" : "register-four-input-wrapper-condenced"}>
                    <DropDown
                        content={countryCodeDropDown}
                        change={changeCode}
                        label={"Country code"}
                        defaultValue={"Russia +7"}
                    />
                    <ValidatedTextInput
                        valid={true}
                        name={"phone"}
                        label="Ваш номер телефона"
                        changeValue={changePhone}
                    />
                    {validNumber ? <></> : <p className="register-error color-red">Введите корректный номер телефона</p>}
                </div>
                <div className="register-four-checkbox-wrapper">
                    <p className="register-text color-gray">Ваши контакты смогут найти Вас по номеру телефона и связаться с Вами. <span className="register-link color-blue">Узнать больше</span>.</p>
                    <Checkbox />
                </div>
                <div className="register-four-checkbox-wrapper">
                    <p className="register-text color-gray">Разрешить использование номера телефона, включая рекламу (если разрешенго настройками рекламы). Если опция не включена, номер все равно будет использоваться для целей защиты аккаунта, защиты от спама и предотвращения злоупотреблений. <span className="register-link color-blue">Подробнее в Политике конфиденциальности.</span></p>
                    <Checkbox />
                </div>
            </div>
        </div>
    )
}