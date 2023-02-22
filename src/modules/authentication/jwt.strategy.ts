import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersService } from '../users/users.service';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {

        if (payload) {
            const user = await this.usersService.findOneUser({uid: payload.uid});
            if (!user) {
                throw new HttpException('Unauthorized User', HttpStatus.UNAUTHORIZED);
            }
            return user;
        } else {
            return {
                uid: payload.uid
            };
        }
    }
}
