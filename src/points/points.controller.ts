import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { PointDto } from '../dto/point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(private pointService: PointsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getPoint(@Req() req: Request): Promise<{ total: number }> {
    const { userId } = req['user'];
    return await this.pointService.getTotal(userId);
  }
  @UseGuards(AuthGuard)
  @Post()
  async createPoint(@Req() req: Request, @Body() point: PointDto) {
    const { userId } = req['user'];
    return await this.pointService.createPoint(userId, point);
  }
}
