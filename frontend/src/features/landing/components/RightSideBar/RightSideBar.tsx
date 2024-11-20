import React from "react";

import { VKButton } from "../Buttons/VKButton";
import { GosButton } from "../Buttons/GosuslugiButton";
import { SignUpButton } from "../Buttons/SignUpButton";
import { SignInButton } from "../Buttons/SignInButton";

import './RightSideBar.css';
import '../../../../assets/global.css';
import vblogo from '../../../../assets/vblogo.png';

interface RightSideBarProperties {
    toggleRegister: () => void;
    toggleLogin: () => void;
}

export const RightSideBar:React.FC<RightSideBarProperties> = ({toggleRegister, toggleLogin}) => {
    return(
        <div className="right-side-bar">
            <img src={vblogo} className="right-side-bar-logo" />
            <h1 className="right-side-bar-h1">V-блоги</h1>
            <h2 className="right-side-bar-h2">Присоединяйся сейчас!</h2>
            <div className="right-side-bar-signup-wrapper">
                <VKButton />
                <GosButton />
                <div className="right-side-bar-divider">
                    <div className="right-side-bar-line"></div>
                    <p className="right-side-bar-or">или</p>
                    <div className="right-side-bar-line" />
                </div>
                <SignUpButton handleClick={toggleRegister} />
                <p className="right-side-bar-legal color-gray">Регистрируясь Вы соглашаетесь с <span className="link color-blue">Условиями обслуживания</span> и <span className="link color-blue">Политикой конфиденциальности</span>, включая <span className="link color-blue">использование куки</span></p>
            </div>
            <div className="right-side-bar-login-wrapper">
                <h3 className="right-side-bar-h3">Уже есть аккаунт?</h3>
                <SignInButton handleClick={toggleLogin} />
            </div>
        </div>
    )
}