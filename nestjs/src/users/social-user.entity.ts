import {
    SocialUser as ISocialUser,
} from 'src/models/user';
import {
    Column,
    Entity,
    RelationId,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Base } from '../core/entities/base';
import { User } from './user.entity';
import { SocialAuthProviderEnum } from 'src/models';

@Entity('social_user')
export class SocialUser extends Base implements ISocialUser {

    @ManyToOne(() => User, { nullable: true,  onDelete: 'CASCADE' })
    @JoinColumn()
    user?: User;

    @RelationId((socialUser: SocialUser) => socialUser.user)
    @Column()
    userId?: string;

    @Column({ nullable: true })
    provider?: SocialAuthProviderEnum;

    @Column({ nullable: true })
    thirdPartyId?: string;
}
