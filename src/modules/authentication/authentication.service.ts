import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment = require('moment');

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
  ) {}

  createToken = (userUid, expiresIn = '1d') => {
    const jwtPayload = {
      uid: userUid,
      alg: process.env.JWT_ALGORITHM,
      iss: process.env.JWT_ISSUER,
      sub: process.env.JWT_SUBJECT,
      aud: process.env.JWT_AUDIENCE,
      iat: moment().unix(),
    };

    return this.jwtService.sign(jwtPayload, { expiresIn });
  };

  signResetPasswordToken(resetPasswordDataToSign: any) {
    return this.jwtService.sign(resetPasswordDataToSign, { expiresIn: '1h' });
  }

  verifyResetPasswordToken(token: string) {
    return this.jwtService.verify(token);
  }
}
