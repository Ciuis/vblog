import React from "react";

import '../../../../assets/global.css';
import './LandingFooter.css';

export const LandingFooter:React.FC = () => {
    return(
        <div className="landing-footer">
            <p className="footer-link color-gray">О нас</p>
            <p className="footer-link color-gray">Центр помощи</p>
            <p className="footer-link color-gray">Политика использования</p>
            <p className="footer-link color-gray">Политика конфиденциальности</p>
            <p className="footer-link color-gray">Политика куки</p>
            <p className="footer-link color-gray">Доступность</p>
            <p className="footer-link color-gray">Информация о рекламе</p>
            <p className="footer-link color-gray">Блог</p>
            <p className="footer-link color-gray">Карьера</p>
            <p className="footer-link color-gray">Для бизнеса</p>
            <p className="footer-link color-gray">Разработчики</p>
            <p className="footer-link color-gray">Каталог</p>
            <p className="footer-link color-gray">Разработчики</p>
            <p className="footer-link color-gray">Настройки</p>
            <p className="footer-copyright color-gray">&#169; 2023 Vblog</p>
        </div>
    )
}