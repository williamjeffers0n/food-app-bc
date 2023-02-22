import { Connection } from 'typeorm';
import {DATABASE_CONNECTION} from '../../constants/constants';
import { Restaurant } from './restaurant.model';

export const restaurantsProviders = [
    {
        provide: 'RESTAURENTS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Restaurant),
        inject: [DATABASE_CONNECTION],
    }
];
