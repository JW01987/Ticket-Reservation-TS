import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: '비밀번호가 너무 짧습니다' })
  @MaxLength(20, { message: '비밀번호는 20자 이하입니다' })
  password: string;

  @IsNotEmpty()
  @MinLength(2, { message: '이름은 2자 이상입니다' })
  @MaxLength(10, { message: '이름 10자 이하입니다' })
  name: string;

  @IsBoolean()
  isAdmin: boolean;
}
