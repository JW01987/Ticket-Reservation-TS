import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { Reservation } from '../entities/reservation.entity';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async reservation(
    @Req() req: Request,
    @Param('id') showId: number,
  ): Promise<{ message: string }> {
    const { userId } = req['user'];
    return await this.reservationsService.reservation(userId, showId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getReservation(@Req() req: Request): Promise<Reservation[]> {
    const { userId } = req['user'];
    return await this.reservationsService.getReservation(userId);
  }
}
