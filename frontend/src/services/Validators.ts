import { BirthDate } from "../utils/GlobalInterfaces";

export const validateName = (value:string):boolean => {
    return value !== '';
}

export const validateBirthDate = (birthDate: BirthDate): boolean => {

    let {month, day, year} = birthDate;

    if (!month || !day || !year) return false;

    const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    if (month === 2) {
        if (day > 29) return false;
        if (day === 29 && !isLeapYear(year)) return false;
    } else if ([4, 6, 9, 11].includes(month) && day > 30) {
        return false;
    }

    return checkAge(birthDate);
}

const checkAge = ({ month, day, year }: BirthDate): boolean => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    if (todayYear - year > 13) {
        return true;
    } 
    
    else if (todayYear - year === 13) {
        if (todayMonth > month || (todayMonth === month && todayDay >= day)) {
            return true;
        }
    }

    return false;
};

export const validateEmail = (value:string):boolean => {
    if (!value.toLocaleLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) return false;

    return true;
}

export const validatePhone = (phone:string):boolean => {
    let stripped = phone.replace(/[^0-9]/g, "");

    return stripped.length === 10;
}