import React from "react";

import { ModuleButton } from "../../../../components/ModuleButton/ModuleButton";

import './ForgotButtonOne.css';

interface ForgotButtonOneProperties {
    value: string;
    handleClick: () => void;
}

export const ForgotButtonOne:React.FC<ForgotButtonOneProperties> =({value, handleClick}) => {
    return (
        <div className="forgot-button-one">
            <ModuleButton
                active={value ? true : false}
                height={50}
                fontColor={'white'}
                backgroundColor={value ? 'black' : "rgba(0, 0, 0, .8)"}
                fontSize={17}
                fontWeight={700}
                hoverBackground={{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: .8
                }}
                onClick={handleClick}
            >
                Далее
            </ModuleButton>
        </div>
    )
}