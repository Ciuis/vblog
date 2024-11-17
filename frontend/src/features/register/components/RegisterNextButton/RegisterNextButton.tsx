import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, stepForward, updatePassword, updatePhone, verifyEmail } from "../../../../redux/Slices/RegisterSlice";

import { StyledNextButtonProperties } from "../../../../utils/GlobalInterfaces";
import { AppDispatch, RootState } from "../../../../redux/Store";

export const StyledNextButton = styled.button<StyledNextButtonProperties>`
    width: 75%;
    height: 52px;
    font-size: 16px;
    color: white;
    background-color: ${(props) => props.color === 'blue' ? props.theme.colors.blue : props.theme.colors.black};
    opacity: ${(props) => props.active ? 1.0 : .5};
    border-radius: 50px;
    border: none;
    cursor: ${(props) => props.active ? "pointer" : "auto"};
    transition: background-color 0.3s, opacity 0.3s;
`;

interface RegisterNextButtonProperties {
    step: number;
}

export const RegisterNextButton:React.FC<RegisterNextButtonProperties> = ({step}) => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const nextStep = () => {
        dispatch(stepForward());
    }

    const sendUserInfo = () => {

        const user = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            birthDate: `${state.birthDate.year}-${state.birthDate.month.toString().padStart(2, '0')}-${state.birthDate.day.toString().padStart(2, '0')}`
        }

        dispatch(registerUser(user));
    }

    const sendPhone = () => {
        dispatch(updatePhone({
            username: state.username,
            phone: state.phone
        }));
    }

    const verify = () => {
        dispatch(verifyEmail({
                username: state.username,
                code: state.code
            }));
    }

    const sendPassword = () => {
        dispatch(updatePassword({
            username: state.username,
            password: state.password
        }));
    }

    const determineButtonContent = (step:number):JSX.Element => {
        switch(step) {
            case 1:

                let stepOneActive = state.isValidBirthDate && state.isValidEmail && state.isValidFirstName && state.isValidLastName;

                return <StyledNextButton
                            disabled={!stepOneActive}
                            color={'black'}
                            active={stepOneActive}
                            onClick={nextStep}>
                                Далее
                        </StyledNextButton>

            case 2:
                return <StyledNextButton
                            active={true} 
                            color={'black'} 
                            onClick={nextStep}>
                                Далее
                        </StyledNextButton>

            case 3:
                return <StyledNextButton 
                            onClick={sendUserInfo} 
                            color={"blue"} 
                            active={true}>
                                Продолжить регистрацию
                        </StyledNextButton>

            case 4:

                let stepFourActive = (state.phone && state.isValidPhone) ? true : false;

                return <StyledNextButton 
                            disabled={!stepFourActive}
                            color={'black'}
                            active={stepFourActive}
                            onClick={sendPhone}>
                                Обновить номер телефона
                        </StyledNextButton>

            case 5:

                let stepFiveActive = state.code ? true : false;

                return <StyledNextButton 
                            active={stepFiveActive} 
                            disabled={!stepFiveActive} 
                            color={"black"}
                            onClick={verify}>
                                Далее
                        </StyledNextButton>

            case 6:
                return <StyledNextButton 
                            active={state.password.length >= 8} 
                            disabled={!(state.password.length >= 8)} 
                            onClick={sendPassword} 
                            color={"black"}>
                                Далее
                        </StyledNextButton>

            default:
                return <StyledNextButton
                    disabled={true}
                    color={'black'}
                    active={false}
                    onClick={() => console.log("hello")}>
                        {step}
                </StyledNextButton>
        }
    }

    return determineButtonContent(step);
}