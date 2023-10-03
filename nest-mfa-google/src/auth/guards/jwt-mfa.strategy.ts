import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtMfaStrategy extends PassportStrategy(
  Strategy,
  'jwt-mfa'
) {
  constructor(
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.mfa_token;
        },
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findUserById(payload.id);
    if (!user.isMfaEnabled) {
      return user;
    }
    if (payload.isMfaPassed) {
      return user;
    }
  }
}
