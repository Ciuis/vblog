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

export interface PostImage {
    imageId: number;
    imageName: string;
    imageType: string;
    imageUrl: string;
}

export interface Post {
    postId: number;
    content: string;
    postedDate?: Date;
    author: User;
    replies?: Post[];
    likes: number;
    images: PostImage[];
    reposts: number;
    views: number;
    scheduled: boolean;
    scheduledDate?: Date;
    audience: 'EVERYONE' | 'CIRCLE';
    replyRestriction: 'EVERYONE' | 'FOLLOW' | 'CIRCLE' | 'MENTION';
}

export interface TenorCategories {
    image: string;
    name: string;
    path: string;
    searchterm: string;
}