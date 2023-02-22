import { createConnection } from 'typeorm';
import {
  DATABASE_CONNECTION
} from '../constants/constants';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOSTNAME,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone: '+00:00',
        dialectOptions: {
          connectTimeout: 60000,
          bigNumberStrings: false,
          decimalNumbers: true,
          timezone: '+00:00',
        },
        replication: {
          read: [
            {
              host: process.env.DB_HOSTNAME_READER,
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
            },
          ],
          write: {
            host: process.env.DB_HOSTNAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
          },
        },
        pool: {
          max: 10,
          min: 1,
          idle: 500,
          acquire: 60000,
          evict: 3000,
        },
        logging: console.log,
        models: [__dirname + '/../**/*.model{.ts,.js}'],
        modelMatch: (filename, member) => {
          let f = filename
            .substring(0, filename.indexOf('.model'))
            .replace(/-/g, '');
          return f === member.toLowerCase();
        },
      });
      return sequelize;
    },
  },
];
