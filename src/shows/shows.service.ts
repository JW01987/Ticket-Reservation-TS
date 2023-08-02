import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowDto } from '../dto/show.dto';
import { Show } from '../entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show) private showsRepository: Repository<Show>,
  ) {}

  async findOne(id: number) {
    const found = await this.showsRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('해당 공연이 없습니다');
    return found;
  }
  async createShow(userId: number, isAdmin: boolean, show: ShowDto) {
    //생각헤보니까 배열로 받은 시간을 분리해서 하나하나 넣으면 될듯?;
    if (isAdmin !== true) {
      throw new NotAcceptableException('권한이 없습니다');
    }
    await this.showsRepository.insert(show);
    return true;
  }

  async getAll() {
    const found = await this.showsRepository
      .createQueryBuilder('show')
      .select('show.title', 'title')
      .addSelect('show.price', 'price')
      .addSelect('show.desc', 'desc')
      .addSelect('show.place', 'place')
      .addSelect('show.category', 'category')
      .addSelect('show.image', 'image')
      .addSelect('show.totalSeat', 'totalSeat')
      .addSelect('GROUP_CONCAT(show.time)', 'time')
      .groupBy(
        'show.title, show.price, show.desc, show.place, show.category, show.image, show.totalSeat',
      )
      .having('COUNT(*) > 1')
      .orHaving('COUNT(*) = 1')
      .getRawMany();

    const result = found.map((data) => ({
      ...data,
      time: data.time.split(','),
    }));

    return result;
  }

  async getByTitle(title: string) {
    const found = await this.showsRepository
      .createQueryBuilder('show')
      .select('show.title', 'title')
      .addSelect('show.price', 'price')
      .addSelect('show.desc', 'desc')
      .addSelect('show.place', 'place')
      .addSelect('show.category', 'category')
      .addSelect('show.image', 'image')
      .addSelect('show.totalSeat', 'totalSeat')
      .addSelect('GROUP_CONCAT(show.time)', 'time')
      .groupBy(
        'show.title, show.price, show.desc, show.place, show.category, show.image, show.totalSeat',
      )
      .having('COUNT(*) > 1')
      .orHaving('COUNT(*) = 1') // Add this line to include non-duplicate data
      .where('show.title LIKE :keyword', { keyword: `%${title}%` }) // Add this line to filter by title
      .getRawMany();

    const result = found.map((data) => ({
      ...data,
      time: data.time.split(','), // Split the concatenated time string into an array
    }));

    return result;
  }

  async getDetail(id: number) {
    return this.findOne(id);
    //가져온 토탈 좌석 수에서 예약된 좌석 수 빼서 보여주기
  }
}
