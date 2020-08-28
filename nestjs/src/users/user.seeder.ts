import { Connection, getRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

export const createDefaultUsers = async (
    connection: Connection,
): Promise<User[]> => {

    const users: User[] = [
        new User({
            email: 'user@gmail.com',
            password: await bcrypt.hash('test@123', 12),
            firstName: 'Test',
            lastName: 'User',
        })
    ];

    await connection.manager.save(users);
    return users;
};
