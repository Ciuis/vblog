import React from "react";

import { ModuleButton } from "../../../../components/ModuleButton/ModuleButton";

import './ForgotButtonFour.css';

interface ForgotButtonFourProperties {
    submitNewPassword: () => void;
    active: boolean;
}

export const ForgotButtonFour:React.FC<ForgotButtonFourProperties> = ({submitNewPassword, active}) => {
    return (
        <div className="forgot-button-four">
            <ModuleButton
                active={active}
                height={50}
                fontColor={"white"}
                backgroundColor={active ? "black" : "rgba(0, 0, 0, .7)"}
                fontSize={17}
                fontWeight={700}
                hoverBackground={{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: .9
                }}
                onClick={submitNewPassword}>
                    Изменить пароль
            </ModuleButton>
        </div>
    )
}