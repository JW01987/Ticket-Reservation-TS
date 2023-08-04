import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto): Promise<{ message: string }> {
    return this.userService.signUp(signUpDto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request): Promise<{ name: string; point: number }> {
    const { userId } = req['user'];
    return this.userService.profile(userId);
  }
}
