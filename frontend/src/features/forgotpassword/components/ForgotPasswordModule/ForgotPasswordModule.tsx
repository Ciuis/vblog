import React, {useState, useEffect} from "react";

import axios from "axios";

import { Module } from "../../../../components/Module/Module";
import { ForgotModuleTop } from "../ForgotModuleTop/ForgotModuleTop";
import { validateEmail, validatePhone } from "../../../../services/Validators";
import { determineForgotButton, determineForgotFormContent } from "../../utils/ForgotPasswordUtils";

interface UserInfo {
    email: string;
    phone: string;
    username: string;
}

export const ForgotPasswordModule:React.FC<{toggleModule:() =>void}> = ({toggleModule}) => {
    
    const [credential, setCredential] = useState<string>('');

    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: '',
        phone: '',
        username: ''

    });

    const [error, setError] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [resetCode, setResetCode] = useState<number>(0);
    const [userInputCode, setUserInputCode] = useState<number>(0);
    const [password, setPassword] = useState<Record<string, string>>({
        password:'',
        confirm: ''
    });
    const [matching, setMatching] = useState<boolean>(true);

    const changeCredential = (credential:string) => {
        setCredential(credential);
    }

    const changeUserInputCode = (value:number) => {
        setUserInputCode(value);
    }

    const updatePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }

    const searchUser = async () => {
        let findUserDTO = {
            email: "",
            phone: "",
            username: ""
        };

        if (validateEmail(credential)) {
            findUserDTO = {
                ...findUserDTO,
                email: credential
            }
        } else if (validatePhone(credential)) {
            findUserDTO = {
                ...findUserDTO,
                phone: credential
            }
        } else {
            findUserDTO = {
                ...findUserDTO,
                username: credential
            }
        }

        try {
            setError(false);
            let res = await axios.post('http://localhost:8000/auth/identifiers', findUserDTO);
            let data = await res.data;
            setUserInfo({
                email: data.email,
                phone: data.phone,
                username: data.username
            });
            setStep(2);
        } catch (e) {
            setError(true);
        }
    }

    const sendReset = async () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        setResetCode(code);

        try {
            let request = await axios.post('http://localhost:8000/auth/password/code', {
                email: userInfo.email,
                code
            });

            let res = await request.data;
            setStep(3);
        } catch (e) {
            console.log(e);
        }
    }

    const checkCode = () => {
        if (resetCode === userInputCode) {
            setStep(4);
        } else {
            setError(true);
        }
    }

    const sendPassword = async () => {
        let body = {
            username: userInfo.username,
            password: password.password
        }

        try {
            let request = await axios.put('http://localhost:8000/auth/update/password', body);
            let res = await request.data;
            toggleModule();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (password.password && password.confirm) {
            setMatching(password.password === password.confirm);
        }
    }, [password.password, password.confirm]);
    
    return (
        <Module
            topContent={<ForgotModuleTop closeModule={toggleModule}/>}
            content={determineForgotFormContent(
                step,
                setCredential,
                error,
                userInfo.email,
                userInfo.phone,
                !error,
                changeUserInputCode,
                updatePassword,
                matching
            )}
            bottomContent={determineForgotButton(
                step,
                credential,
                searchUser,
                toggleModule,
                sendReset,
                userInputCode ? true : false,
                checkCode,
                () => {setStep(2)},
                sendPassword,
                (password.password && matching ? true : false)
            )}
        />
    )
}