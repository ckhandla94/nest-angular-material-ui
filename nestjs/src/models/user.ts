import { BaseEntity } from "./base-entity";
import { SocialAuthProviderEnum } from "./auth";

export interface User extends BaseEntity {
    name?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    profilePic?: string,
    stripeCustomerId?: string,
    status?: UserStatusEnum,
    socialUsers?: SocialUser[],
}

export enum UserStatusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}

export interface SocialUser extends BaseEntity {
    userId?: string,
    user?: User,
    provider?: SocialAuthProviderEnum,
    thirdPartyId?: string,
}
