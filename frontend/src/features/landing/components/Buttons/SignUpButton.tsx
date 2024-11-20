import React from "react";

import './Buttons.css';

interface SignUpButtonProperties {
    handleClick: () => void;
}

export const SignUpButton:React.FC<SignUpButtonProperties> = ({handleClick}) => {
    return(
        <div className="landing-button sign-up" onClick={handleClick}>
            <p className="sign-up-text">Зарегистрироваться через электронную почту</p>
        </div>
    )
}