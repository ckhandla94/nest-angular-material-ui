import {
    User as IUser, UserStatusEnum
} from 'src/models/user';
import {
    Column,
    Entity,
    AfterLoad,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Base } from '../core/entities/base';
import { SocialUser } from './social-user.entity';

@Entity('user')
export class User extends Base implements IUser {
    name?: string;

    @OneToMany(() => SocialUser, (socialUser) => socialUser.user)
    socialUsers?: SocialUser[];

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    profilePic?: string;

    @Column({ nullable: true })
    stripeCustomerId?: string;

    @Column({
        default: UserStatusEnum.ACTIVE,
    })
    status?: UserStatusEnum;

    @AfterLoad()
    afterLoad?() {
        const name = this.firstName + ' ' + this.lastName;
        this.name = name;
    }
}
