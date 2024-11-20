import React from "react";

import vklogo from '../../../../assets/vk.png';
import '../../../../assets/global.css';
import './Buttons.css';

export const VKButton:React.FC = () => {
    return(
        <div className="landing-button color-gray vkontakte">
            <img src={vklogo} className="landing-button-logo" />
            <p className="vkontakte-text">Зайти с помощью VK</p>
        </div>
    )
}
