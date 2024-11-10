import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";

import { updatePassword } from "../../../../redux/Slices/RegisterSlice";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { ValidatedTextInput } from "../../../../components/ValidInputs/ValidatedTextInput";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import './RegisterFormSix.css'

export const RegisterFormSix:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const toggleView = () => {
        setActive(!active);
    }

    const sendPassword = async () => {
        await dispatch(updatePassword({
            username: state.username,
            password
        }));

        console.log("navigate");
        navigate("/home");
    }

    return (
        <div className="reg-step-six-container">
            <div className="reg-step-six-content">
                <h1>Вам необходимо установить пароль</h1>
                <p>Пароль должен состоять как минимум из 8 символов.</p>
                <div className="reg-step-six-password">
                    <ValidatedTextInput valid={true} label={"Password"}
                        name={"password"} changeValue={handleChange}
                        attributes={{
                            minLength: 8,
                            type: active ? "text" : "password"
                        }}/>
                    <div onClick={toggleView} className="reg-step-six-icon">
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
            <StyledNextButton active={password.length >= 8} disabled={!(password.length >= 8)} onClick={sendPassword} color={"black"}>
                Далее
            </StyledNextButton>
        </div>
    )
}