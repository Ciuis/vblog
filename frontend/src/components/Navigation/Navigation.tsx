import React from "react";
import { Link } from "react-router-dom";

import './Navigation.css';

import vblogo from '../../assets/vblogo.png';
import HomeSVG from "../SVGs/HomeSVG";
import ExploreSVG from "../SVGs/ExploreSVG";
import MessagesSVG from "../SVGs/MessagesSVG";
import NotificationSVG from "../SVGs/NotificationSVG";
import ListsSVG from "../SVGs/ListsSVG";
import CommunitiesSVG from "../SVGs/CommunitiesSVG";
import VerifiedSVG from "../SVGs/VerifiedSVG";
import ProfileSVG from "../SVGs/ProfileSVG";
import MoreSVG from "../SVGs/MoreSVG";

export const Navigation:React.FC = () => {
    return (
        <div className="navigation">
            <nav className="navigation-container">
                <Link to="/home" className="navigation-logo-bg">
                    <img className="navigation-logo" src={vblogo} />
                </Link>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <HomeSVG height={26} width={26}/>
                        <p className="navigation-text navigation-active">Домой</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ExploreSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Исследовать</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <NotificationSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Уведомления</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <MessagesSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Сообщения</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ListsSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Списки</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <CommunitiesSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Сообщества</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <VerifiedSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Удостоверение</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ProfileSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Профиль</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <MoreSVG height={26} width={26}/>
                        <p className="navigation-text navigation-inactive">Больше</p>
                    </Link>
                </div>
                <button className="navigation-post-button">
                    Публикация
                </button>
            </nav>
            <div className="navigation-options">
                <img className="navigation-options-pimg" src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"/>
                <div className="navigation-options-info">
                    <p className="navigation-options-info-display-name">
                        manuel213452
                    </p>
                    <p className="navigation-options-info-handle">
                        @manuel213452
                    </p>
                </div>
                <p className="navigation-options-dotdotdot">...</p>
            </div>
        </div>
    );
}