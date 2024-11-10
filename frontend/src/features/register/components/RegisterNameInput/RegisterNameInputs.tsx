import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import './RegisterNameInputs.css';

import { ValidatedTextInput } from '../../../../components/ValidInputs/ValidatedTextInput';
import { AppDispatch } from '../../../../redux/Store';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { validateName } from '../../../../services/Validators';

interface RegisterNameInputProperties {
    firstName: string;
    lastName: string;
}

export const RegisterNameInputs:React.FC<RegisterNameInputProperties> = ({firstName, lastName}) => {

    const [isValidFirstName, setFirstValid] = useState<boolean>(true);
    const [isValidLastName, setLastValid] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();

    const updateName = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if (e.target.name === 'firstName') {
            dispatch(updateRegister({name:e.target.name, value:e.target.value}));

            let valid = validateName(e.target.value);
            setFirstValid(valid);

            dispatch(updateRegister({name:'isValidFirstName', value:valid}));
        }

        if (e.target.name === 'lastName') {
            dispatch(updateRegister({name:e.target.name, value:e.target.value}));

            let valid = validateName(e.target.value);
            setLastValid(valid);

            dispatch(updateRegister({name:'isValidLastName', value:valid}));
        } 
    }

    return (
        <div className='register-name-input'>
            <div className='register-name-content'>
                <ValidatedTextInput 
                    valid={isValidFirstName} 
                    name={"firstName"} 
                    label={"First Name"} 
                    changeValue={updateName} 
                    data={firstName}
                    attributes={{
                        maxLength: 50
                    }}
                />
                {isValidFirstName ? <></> : <span className='register-name-error'>Укажите имя</span>}
            </div>
            <div className='register-name-content'>
                <ValidatedTextInput 
                    valid={isValidLastName} 
                    name={"lastName"} 
                    label={"Last Name"} 
                    changeValue={updateName} 
                    data={lastName}
                    attributes={{
                        maxLength: 50
                    }}
                />
                {isValidLastName ? <></> : <span className='register-name-error'>Укажите фамилию</span>}
            </div>
        </div>
    )
}