export interface LoginInput {
    email: string;
    password: string,
}

export interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string,
}

export enum SocialAuthProviderEnum {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
}
