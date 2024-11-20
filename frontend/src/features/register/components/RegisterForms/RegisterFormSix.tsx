import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { setFromRegister, loginUser } from "../../../../redux/Slices/UserSlice";
import { RootState, AppDispatch } from "../../../../redux/Store";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";

import './RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormSix:React.FC = () => {

    const state = useSelector((state:RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        dispatch(updateRegister({
            name: "password",
            value: e.target.value
        }));
    }

    const toggleView = () => {
        setActive(!active);
    }

    useEffect(() => {

        if (state.user.loggedIn) {
            navigate("/home");
            return(() => {

            });
        }

        if (state.user.fromRegister) {
            // we are rady to dispatch the login
            dispatch(loginUser({
                username: state.register.username,
                password: state.register.password
            }));

            return;
        }
        
        if (state.register.login) {
            // store some user info into local storage, that we can load the user into the user slice when we hit
            // the feed page
            // navigate("/home");
            // set the dispatch to set user.fromRegister
            dispatch(setFromRegister(true));
        }
    }, [state.register.login, state.user.loggedIn, state.user.fromRegister]);

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header-2">Вам необходимо установить пароль</h1>
                <p className="register-text color-gray">Пароль должен состоять как минимум из 8 символов.</p>
                <div className="register-six-password">
                    <ValidatedTextInput valid={true} label={"Password"}
                        name={"password"} changeValue={handleChange}
                        attributes={{
                            minLength: 8,
                            type: active ? "text" : "password"
                        }}/>
                    <div onClick={toggleView} className="register-six-icon">
                        {active ? <VisibilityOffOutlinedIcon sx={{
                            fontSize: "24px",
                        }}/> : 
                        <VisibilityOutlinedIcon sx={{
                            fontSize: "24px"
                        }}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}