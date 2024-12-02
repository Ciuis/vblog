import React from "react";

import { AppDispatch } from "../../../redux/Store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/Slices/UserSlice";

import { ModuleButton } from "../../../components/ModuleButton/ModuleButton";

import '../../../assets/global.css';
import './LoginButton.css';

interface LoginButtonProperties {
    username: string;
    password: string;
}

export const LoginButton:React.FC<LoginButtonProperties> = ({username, password}) => {
    
    const dispatch:AppDispatch = useDispatch();

    const handleLogin = () => {
        dispatch(loginUser({
            username,
            password
        }));
    }
    
    return (
        <div className="login-button">
            <ModuleButton
                onClick={handleLogin}
                active={password !== '' ? true : false}
                disabled={password !== '' ? false : true}
                height={50}
                fontColor={"white"}
                backgroundColor={password !== '' ? "black" : "rgba(0, 0, 0, .5)"}
                fontSize={17}
                fontWeight={700}
                hoverBackground={{
                    r: 0,
                    g: 0,
                    b: 0,
                    a: .8
                }}>
                Войти
                </ModuleButton>
                <div className="login-button-text color-gray">Нет аккаунта? <span className="link color-blue">Зарегистрироваться</span></div>
        </div>
    )
}