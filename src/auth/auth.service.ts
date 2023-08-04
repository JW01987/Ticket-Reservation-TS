import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException('계정이 존재하지 않습니다');
    if (user?.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }
    const payload = { userId: user.id, isAdmin: user.isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
