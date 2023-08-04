import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../entities/seat.entity';
import { ReservationsModule } from '../reservations/reservations.module';
import { ShowsModule } from '../shows/shows.module';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    forwardRef(() => ShowsModule),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
