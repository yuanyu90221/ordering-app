import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
// import { User } from '../users/models/user';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../auth.service';
// import { User } from '../users/schemas/user.schema';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      const user = await this.usersService.getUser({ userId });
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
