import { Configuration } from "src/models/configuration";
import { DatabaseType } from "typeorm";

export default (): Configuration => ({
    appKey: process.env.APP_KEY || '',
    appUrl: process.env.APP_URL || '',
    frontUrl: process.env.FRONT_URL || '',
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET
    },
    stripe: {
        currency: process.env.STRIPE_CURRENCY || 'USD',
        privateKey: process.env.STRIPE_PRIVATE_KEY || '',
        publicKey: process.env.STRIPE_PUBLIC_KEY || '',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    facebook: {
        loginDialogUri: 'https://www.facebook.com/v2.12/dialog/oauth',
        accessTokenUri: 'https://graph.facebook.com/v2.12/oauth/access_token',
        oauthRedirectUri: `${process.env.APP_URL}/api/auth/facebook/callback`,
        appId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        state: '{fbstate}'
    },
    database: {
        type: (process.env.DATABASE_TYPE || 'mysql') as DatabaseType,
        host: process.env.DATABASE_HOST || 'localhost',
        username: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306
    }
})