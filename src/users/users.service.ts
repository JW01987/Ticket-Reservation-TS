import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { PointDto } from '../dto/point.dto';
import { User } from '../entities/user.entity';
import { PointsService } from '../points/points.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private pointsService: PointsService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async signUp(signUpDto: CreateUserDto): Promise<{ message: string }> {
    const found = await this.findOne(signUpDto.email);
    if (found) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }
    const newData = await this.userRepository.create(signUpDto);
    const savedData = await this.userRepository.save(newData);
    const point: PointDto = {
      point: 100000,
      pointStatus: 1,
    };
    await this.pointsService.createPoint(savedData.id, point);
    return { message: '회원가입이 완료되었습니다' };
  }
  async profile(id: number) {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('계정이 존재하지 않습니다');
    }
    const point = await this.pointsService.getTotal(id);
    return {
      name: found.name,
      point: point.total,
    };
  }
}
