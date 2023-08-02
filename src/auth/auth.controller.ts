import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('access_token', result.access_token, { httpOnly: true });
    return res.status(HttpStatus.OK).json(result);
  }
}
