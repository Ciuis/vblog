import { RegisterFormFour } from "../components/RegisterFormFour/RegisterFormFour"
import { RegisterFormOne } from "../components/RegisterFormOne/RegisterFormOne"
import { RegisterFormThree } from "../components/RegisterFormThree/RegisterFormThree"
import { RegisterFormTwo } from "../components/RegisterFormTwo/RegisterFormTwo"
import { RegisterFormFive } from "../components/RegisterFormFive/RegisterFormFive"
import { RegisterFormSix } from "../components/RegisterFormSIx/RegisterFormSix"

import data from '../../../data/telcodes.json';

export const determineModuleContent = (step: number): JSX.Element => {
    switch(step) {
        case 1:
            return <RegisterFormOne />
        case 2:
            return <RegisterFormTwo />
        case 3:
            return <RegisterFormThree />
        case 4:
            return <RegisterFormFour />
        case 5:
            return <RegisterFormFive />
        case 6:
            return <RegisterFormSix />
        default:
            return <></>
    }
}

export const countryCodeDropDown = ():JSX.Element[] => {
    let options = data.filter((country) => {
        if (country.code !== "RU") {
            return country;
        }
    }).map((country) => {
        return <option value={`${country.dial_code} ${country.name}`}
            key={country.code}>
                {`${country.dial_code} ${country.name}`}
            </option>
    });

    options.unshift(
        <option value={"+7 Russia"} key={"RU"}>{"+7 Russia"}</option>
    )

    return options;
}