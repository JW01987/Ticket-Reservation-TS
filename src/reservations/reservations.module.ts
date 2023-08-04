import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { PointsModule } from '../points/points.module';
import { SeatsModule } from '../seats/seats.module';
import { ShowsModule } from '../shows/shows.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    PointsModule,
    forwardRef(() => ShowsModule),
    forwardRef(() => SeatsModule),
  ],
  exports: [ReservationsService],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
