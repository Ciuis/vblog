import React from "react";

import { ModuleButton } from "../../../../components/ModuleButton/ModuleButton";

import './ForgotButtonThree.css';

interface ForgotButtonThreeProperties {
    active: boolean;
    checkCode: ()=>void;
    back: ()=>void;
}

export const ForgotButtonThree:React.FC<ForgotButtonThreeProperties> = ({active, checkCode, back}) => {
    return (
        <div className="forgot-button-three">
            {
                active ?
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
                        onClick={checkCode}>
                        Далее
                    </ModuleButton> :
                    <ModuleButton
                        active={true}
                        height={50}
                        fontColor={"black"}
                        backgroundColor={"white"}
                        borderColor={"#AAB8C2"}
                        fontSize={17}
                        fontWeight={600}
                        hoverBackground={{
                            r: 0,
                            g: 0,
                            b: 0,
                            a: .05
                        }}
                        hoverBorder={{
                            r: 0,
                            g: 0,
                            b: 0,
                            a: .3
                        }}
                        onClick={back}>
                            Назад
                    </ModuleButton>
            }
        </div>
    )
}