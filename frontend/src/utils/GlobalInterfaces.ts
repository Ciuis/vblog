interface ThemeColors {
    blue: string;
    black: string;
    darkGray: string;
    gray: string;
    lightGray: string;
    white: string;
    error: string
}

export interface Theme {
    colors: ThemeColors
}

export interface StyledInputProperties {
    active: boolean;
    valid: boolean;
    theme: Theme;
    color?: string;
}

export interface ValidatedInputState {
    active: boolean;
    valid: boolean;
    typedIn: boolean;
    labelActive: boolean;
    labelColor: string;
    value: string;
}

export interface BirthDate {
    month: number;
    day: number;
    year: number;
}

export interface StyledNextButtonProperties {
    active: boolean;
    theme: Theme;
    color: string;
}

export interface StyledCheckboxProperties {
    active: boolean;
    theme: Theme;
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    birthDate: BirthDate;
    bio: string;
    nickname: string;
    profilePicture: string;
    bannerPicture: string;
}

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface ModuleButtonProperties {
    active: boolean;
    height: number;
    fontColor: string;
    borderColor?: string;
    backgroundColor: string;
    fontSize: number;
    fontWeight: number;
    hoverBackground: RGBA;
    hoverBorder?: RGBA;
}

export interface SVGProperties {
    height: number;
    width: number;
    color?: string;
}