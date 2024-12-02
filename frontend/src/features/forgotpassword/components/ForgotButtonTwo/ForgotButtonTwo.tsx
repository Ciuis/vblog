import React from "react";

import { ModuleButton } from "../../../../components/ModuleButton/ModuleButton";

import './ForgotButtonTwo.css';

interface ForgotButtonTwoProperties {
    onCancel: () => void;
    sendCode: ()=> void;
}

export const ForgotButtonTwo:React.FC<ForgotButtonTwoProperties> = ({onCancel, sendCode}) => {
    return (
        <div className="forgot-button-two">
            <ModuleButton
                active={true}
                height={50}
                fontColor={"white"}
                backgroundColor={"black"}
                fontSize={17}
                fontWeight={700}
                hoverBackground={{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: .9
                }}
                onClick={sendCode}>
                    Далее
            </ModuleButton>
            <ModuleButton
                active={true}
                height={50}
                fontColor={"black"}
                backgroundColor={"white"}
                borderColor={"#536471"}
                fontSize={17}
                fontWeight={600}
                hoverBorder={{
                    r: 83,
                    g: 100,
                    b: 113,
                    a: 1
                }}
                hoverBackground={{
                    r: 83,
                    g: 100,
                    b: 113,
                    a: .1
                }}
                onClick={onCancel}>
                    Отмена
            </ModuleButton>
        </div>
    )
}