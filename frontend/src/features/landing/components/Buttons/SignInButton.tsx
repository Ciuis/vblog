import React from "react";

import '../../../../assets/global.css';
import './Buttons.css';

interface SignInButtonProperties {
    handleClick: () => void;
}

export const SignInButton:React.FC<SignInButtonProperties> = ({handleClick}) => {
    return(
        <div className="landing-button sign-in" onClick={handleClick}>
            <p className="sign-in-text color-blue">Войти</p>
        </div>
    )
}