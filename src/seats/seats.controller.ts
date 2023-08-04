import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ReservationDto } from '../dto/reservation.dto';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async takeSeat(@Req() req: Request, @Body() seatInfo: ReservationDto) {
    const { userId } = req['user'];
    return await this.seatsService.takeSeat(userId, seatInfo);
  }
}
