import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";

import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";
import { countryCodeDropDown } from "../../utils/RegisterModuleUtils";
import { validatePhone } from "../../../../services/Validators";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import { updatePhone, updateRegister } from "../../../../redux/Slices/RegisterSlice";

import './RegisterFormFour.css';

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

    const sendPhone = () => {
        dispatch(updatePhone({
            username: state.username,
            phone: phone
        }));
    }

    useEffect(() => {
        console.log(phoneCode, phone);

        if(phone) {
            setValidNumber(validatePhone(phone));
        }

    }, [phoneCode, phone])

    return (
        <div className="reg-step-four-container">
            <div className="reg-step-four-content">
                <h1>Добавьте номер телефона</h1>
                <p className="reg-step-four-subheader">Укажите номер телефона, который вы хотите связать с аккаунтом</p>
                <div className="reg-step-four-inputs">
                    <DropDown
                        content={countryCodeDropDown}
                        change={changeCode}
                        label={"Country code"}
                        defaultValue={"Russia +7"}
                    />
                    <ValidatedTextInput
                        valid={true}
                        name={"phone"}
                        label="Your phone number"
                        changeValue={changePhone}
                    />
                    {validNumber ? <></> : <p className="reg-step-four-invalid">Введите корректный номер телефона</p>}
                </div>
                <div className="reg-step-four-check-group">
                    <p>Ваши контакты смогут найти Вас по номеру телефона и связаться с Вами. <span className="reg-step-four-link">Узнать больше</span>.</p>
                    <Checkbox />
                </div>
                <div className="reg-step-four-check-group">
                    <p>Разрешить использование номера телефона, включая рекламу (если разрешенго настройками рекламы). Если опция не включена, номер все равно будет использоваться для целей защиты аккаунта, защиты от спама и предотвращения злоупотреблений. <span className="reg-step-four-link">Подробнее в Политике конфиденциальности.</span></p>
                    <Checkbox />
                </div>
            </div>
            <StyledNextButton 
                    disabled={(phone && validNumber) ? false : true}
                    color={'black'}
                    active={(phone && validNumber) ? true : false}
                    onClick={sendPhone}>Обновить номер телефона</StyledNextButton>
        </div>
    )
}