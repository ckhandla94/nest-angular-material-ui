import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, Not } from 'typeorm';
import { CrudService } from 'src/core/crud/crud.service';
import { User } from './user.entity';
import { SocialUser } from './social-user.entity';
import { SocialAuthProviderEnum } from 'src/models';


@Injectable()
export class UserService extends CrudService<User> {

    constructor(
        @InjectRepository(User)
        userRepository: Repository<User>,

        @InjectRepository(SocialUser)
        private readonly socialUserRepository: Repository<SocialUser>
    ) {
        super(userRepository);
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.repository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
        return user;
    }

    async getUserIdByEmail(email: string): Promise<string> {
        const user = await this.getUserByEmail(email);
        const userId = user.id;
        return userId;
    }

    async checkIfExistsEmail(email: string, idgnoreId?: string): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                email: email,
                ...(idgnoreId ? { id: Not(idgnoreId) } : {})
            }
        })
        return count > 0;
    }

    async checkIfExists(id: string): Promise<boolean> {
        const count = await this.repository.count({ id });
        return count > 0;
    }

    async checkIfExistsThirdParty(thirdPartyId: string, provider?: SocialAuthProviderEnum): Promise<boolean> {
        const count = await this.socialUserRepository.count({
            where: {
                thirdPartyId,
                ...(provider ? { provider } : {})
            }
        });
        return count > 0;
    }

    async getIfExists(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    async getIfExistsThirdParty(thirdPartyId: string, provider?: SocialAuthProviderEnum): Promise<User> {
        const socialUser = await this.socialUserRepository.findOne({
            where: {
                thirdPartyId,
                ...(provider ? { provider } : {}),
            },
            relations: ['user']
        });
        return socialUser.user;
    }

    async addThirdParty(user: User, provider: SocialAuthProviderEnum, id: string) {
        const socialUser = new SocialUser({
            user: user,
            provider,
            thirdPartyId: id
        });
        await this.socialUserRepository.save(socialUser);
        return socialUser;
    }

    async changePassword(id: string, hash: string) {
        const user = await this.findOne(id);
        user.password = hash;
        return await this.repository.save(user);
    }
}
