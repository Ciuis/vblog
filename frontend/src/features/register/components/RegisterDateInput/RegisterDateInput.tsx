import React, {useState, useEffect} from 'react';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';

import './RegisterDateInput.css';

import { ValidatedDateSelector } from '../../../../components/ValidInputs/ValidatedDateSelector';
import { getMonths, getDays, getYears } from '../../../../utils/DateUtils';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { validateBirthDate } from '../../../../services/Validators';
import { BirthDate } from '../../../../utils/GlobalInterfaces';

interface RegisterDateInputProperties {
    date: BirthDate
}

export const RegisterDateInput:React.FC<RegisterDateInputProperties> = ({date}) => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [valid, setValid] = useState(true);

    const updateState = (name:string, value:string|number|boolean):void => {
        dispatch(updateRegister({
            name,
            value
        }));
    }

    useEffect(() => {
        let {day, month, year} = state.birthDate;

        if (day && month && year) {
            setValid(validateBirthDate({
                month,
                day,
                year
            }));

            dispatch(updateRegister({name:'isValidBirthDate', value:valid}));
        }
    }, [state.birthDate.day, state.birthDate.month, state.birthDate.year, state.isValidBirthDate, valid]);

    return (
        <div className='register-date'>
            <div className='register-date-content'>
                <div className='register-date-month'>
                    <ValidatedDateSelector
                        style={'validated-month'}
                        valid={valid}
                        name={"Month"}
                        dropDown={getMonths}
                        dispatcher={updateState}
                        data={date.month}
                    />
                </div>
                <div className='register-date-day'>
                    <ValidatedDateSelector
                        style={'validated-day'}
                        valid={valid}
                        name={"Day"}
                        dropDown={getDays}
                        dispatcher={updateState}
                        data={date.day}
                    />
                </div>
                <div className='register-date-year'>
                    <ValidatedDateSelector
                        style={'validated-year'}
                        valid={valid}
                        name={"Year"}
                        dropDown={getYears}
                        dispatcher={updateState}
                        data={date.year}
                    />
                </div>
            </div>
            {valid ? <></> : <span className='register-date-error'>Please enter a valid date. You must be older than 13.</span>}
        </div>
    )
}