import { HttpModule, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {AuthenticationController} from './authentication.controller';
import {DatabaseModule} from '../../database/database.module';
import {authenticationProviders} from './authentication.providers';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import * as dotenv from 'dotenv';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';


dotenv.config();

@Module({
    imports: [DatabaseModule, HttpModule,
        ConfigModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2y' },
        })],
    providers: [
        JwtStrategy,
        ...authenticationProviders,
        AuthenticationService,
        ...usersProviders,
        UsersService,
    ],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
