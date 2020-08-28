import { DatabaseType } from "typeorm";

export interface Configuration {
    appKey: string,
    appUrl: string,
    frontUrl: string,
    port: number;
    jwt: {
        secret: string;
    }
    stripe?: {
        currency: string,
        publicKey: string,
        privateKey: string,
    },
    google?: {
        clientId: string,
        clientSecret: string,
    },
    facebook?: {
        loginDialogUri: string;
        accessTokenUri: string;
        oauthRedirectUri: string;
        appId: string;
        clientSecret: string;
        state: string;
    },
    database: {
        type: DatabaseType;
        host: string;
        username: string;
        password: string;
        database: string;
        port: number;
    } | string;
}