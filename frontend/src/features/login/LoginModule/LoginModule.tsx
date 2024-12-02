import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";

import { Module } from "../../../components/Module/Module";
import { LoginModuleTop } from "../LoginModuleTop/LoginModuleTop";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { LoginFormTwo } from "../LoginForms/LoginFormTwo";
import { LoginButton } from "../LoginButton/LoginButton";

interface LoginModuleProperties {
    toggleModule: () => void;
    toggleRegister: () => void;
    toggleForgot: () => void;
}

export const LoginModule:React.FC<LoginModuleProperties> = ({toggleModule, toggleRegister, toggleForgot}) => {

    const navigate = useNavigate();

    const state = useSelector((state:RootState) => state.user);

    const [password, setPassword] = useState<string>('');

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const openRegister = () => {
        toggleModule();
        toggleRegister();
    }

    useEffect(() => {
        if (state.loggedIn) {
            navigate('/home');

            return () => {
                
            }
        }
    });

    return(
        <Module
            topContent={<LoginModuleTop closeModule={toggleModule}/>}
            content={state.username ? <LoginFormTwo setPassword={handlePassword} /> : <LoginFormOne noAccount={openRegister} forgot={toggleForgot}/>}
            bottomContent={state.username ? <LoginButton username={state.username} password={password}/> : <></>}
        />
    )
}