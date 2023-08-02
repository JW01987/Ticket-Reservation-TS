import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointDto } from '../dto/point.dto';
import { Point } from '../entities/point.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point) private pointRepository: Repository<Point>,
  ) {}

  async getTotal(userId: number): Promise<{ total: number }> {
    const queryBuilder = await this.pointRepository.createQueryBuilder('point');
    queryBuilder
      .select(
        'SUM(CASE WHEN point.pointStatus = 1 THEN point.point ELSE -point.point END)',
        'totalPoints',
      )
      .where('point.userId = :userId', { userId });

    const result = await queryBuilder.getRawOne();
    return {
      total: result.totalPoints || 0,
    };
  }
  async createPoint(userId: number, point: PointDto) {
    try {
      await this.pointRepository.insert({
        userId,
        ...point,
      });
      return await this.getTotal(userId);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
