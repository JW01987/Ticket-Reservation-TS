import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //findOne  파라미터와 상관없이 검색안되나
  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async signUp(signUpDto: CreateUserDto) {
    const found = await this.findOne(signUpDto.email);
    if (found) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }
    return this.userRepository.insert(signUpDto);
  }
  async profile(id: number) {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('계정이 존재하지 않습니다');
    }
    return {
      name: found.name,
    };
  }
}
