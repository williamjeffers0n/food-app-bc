import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthAllowEmptyTokenGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info?.message === 'No auth token') { return false; }
    return user;
  }
}
