import React from "react";

import vblogo from '../../../assets/vblogo.png';
import './LoginModuleTop.css';

interface LoginModuleTopProperties {
    closeModule: () => void;
}

export const LoginModuleTop:React.FC<LoginModuleTopProperties> = ({closeModule}) => {
    return(
        <div className="login-module-top">
            <div className="login-module-top-left">
                <div className="login-module-top-shadow" onClick={closeModule}>
                    x
                </div>
            </div>
            <div className="login-module-top-middle">
                <img className="login-module-top-logo" src={vblogo} />
            </div>
            <div className="login-module-top-right"></div>
        </div>
    )
}