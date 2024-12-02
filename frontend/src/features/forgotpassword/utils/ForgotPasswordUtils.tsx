import { ForgotButtonOne } from "../components/ForgotButtonOne/ForgotButtonOne";
import { ForgotButtonTwo } from "../components/ForgotButtonTwo/ForgotButtonTwo";
import { ForgotButtonThree } from "../components/ForgotButtonThree/ForgotButtonThree";
import { ForgotButtonFour } from "../components/ForgotButtonFour/ForgotButtonFour";
import { ForgotFromOne } from "../components/ForgotForms/ForgotFormOne";
import { ForgotFormTwo } from "../components/ForgotForms/ForgotFormTwo";
import { ForgotFormThree } from "../components/ForgotForms/ForgotFormThree";
import { ForgotFormFour } from "../components/ForgotForms/ForgotFormFour";

export const determineForgotFormContent = (
            step:number, 
            setCredential:(value:string) => void, 
            error:boolean, 
            email:string, 
            phone:string, 
            valid:boolean, 
            updateCode:(value:number)=>void,
            updatePassword:(e:React.ChangeEvent<HTMLInputElement>)=>void,
            matching:boolean
        ):JSX.Element => {
    switch (step) {
        case 1:
            return <ForgotFromOne setCredential={setCredential} error={error} />;
        case 2:
            return <ForgotFormTwo email={email} phone={phone} />;
        case 3: 
            return <ForgotFormThree valid={valid} updateCode={updateCode} />;
        case 4:
            return <ForgotFormFour updatePassword={updatePassword} matching={matching}/>;
    }

    return <></>
}

export const determineForgotButton = (
            step:number, 
            credential:string, 
            searchUser:()=>void, 
            cancel:()=>void, 
            sendCode:()=>void, 
            formThreeActive:boolean, 
            checkCode:()=>void,
            back:()=>void,
            submitNewPassword:()=>void,
            formFourActive:boolean
        ):JSX.Element => {
    switch (step) {
        case 1:
            return <ForgotButtonOne handleClick={searchUser} value={credential} />;
        case 2:
            return <ForgotButtonTwo onCancel={cancel} sendCode={sendCode} />;
        case 3:
            return <ForgotButtonThree active={formThreeActive} checkCode={checkCode} back={back} />;
        case 4:
            return <ForgotButtonFour submitNewPassword={submitNewPassword} active={formFourActive} />;
    }

    return <></>;
}