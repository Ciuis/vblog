import React from "react";

import gos from '../../../../assets/gos.png';
import '../../../../assets/global.css';
import './Buttons.css';

export const GosButton:React.FC = () => {
    return(
        <div className="landing-button color-gray gosuslugi">
            <img src={gos} className="landing-button-logo" />
            <p className="gosuslugi-text">Зайти с помощью Госуслуг</p>
        </div>
    )
}