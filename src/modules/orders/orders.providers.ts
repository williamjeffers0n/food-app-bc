import { Connection } from 'typeorm';
import {DATABASE_CONNECTION} from '../../constants/constants';
import { Order } from './order.model';

export const ordersProviders = [
    {
        provide: 'ORDERS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: [DATABASE_CONNECTION],
    }
];
