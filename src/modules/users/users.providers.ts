import { Connection } from 'typeorm';
import {DATABASE_CONNECTION} from '../../constants/constants';
import { User } from './user.model';

export const usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [DATABASE_CONNECTION],
    }
];
