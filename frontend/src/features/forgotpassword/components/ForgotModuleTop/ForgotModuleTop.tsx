import React from "react";

import vblogo from '../../../../assets/vblogo.png';

import './ForgotModuleTop.css';
import '../../../../assets/global.css';

interface ForgotModuleTopProperties {
    closeModule: () => void;
}

export const ForgotModuleTop:React.FC<ForgotModuleTopProperties> = ({closeModule}) => {
    return (
        <div className="forgot-module-top">
            <div className="forgot-module-top-left" onClick={closeModule}>
                <div className="forgot-module-top-shadow">
                    x
                </div>
            </div>
            <div className="forgot-module-top-middle">
                <img className="forgot-module-top-logo" src={vblogo}/>
            </div>
            <div className="forgot-module-top-right"></div>
        </div>
    )
}