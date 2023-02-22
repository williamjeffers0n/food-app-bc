import { Connection } from 'typeorm';
import {DATABASE_CONNECTION} from '../../constants/constants';
import { Item } from './item.model';

export const itemsProviders = [
    {
        provide: 'ITEMS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Item),
        inject: [DATABASE_CONNECTION],
    }
];
