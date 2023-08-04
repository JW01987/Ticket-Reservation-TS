import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationDto } from '../dto/reservation.dto';
import { Seat } from '../entities/seat.entity';
import { ReservationsService } from '../reservations/reservations.service';
import { ShowsService } from '../shows/shows.service';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private seatsRepository: Repository<Seat>,
    @Inject(forwardRef(() => ReservationsService))
    private reservationsService: ReservationsService,
    @Inject(forwardRef(() => ShowsService))
    private showService: ShowsService,
  ) {}

  //예매 된 좌석 수 구하기
  async findByShow(showId: number): Promise<number> {
    const found = await this.seatsRepository
      .createQueryBuilder('seat')
      .innerJoin('seat.reservation', 'reservation')
      .where('seat.showId = :showId', { showId })
      .andWhere('seat.reservationId = reservation.id')
      .andWhere('reservation.isReservation = true')
      .getMany();
    return found.length;
  }

  async takeSeat(userId: number, seatInfo: ReservationDto) {
    const { showId, count } = seatInfo;
    //예약가능한지 확인
    const seats = await this.findByShow(showId);
    const found = await (await this.showService.findOne(showId)).totalSeat;
    if (count < Number(found) - Number(seats)) {
      //예약 만들기
      const reservation = (
        await this.reservationsService.createReservations(userId)
      ).id;
      //좌석 수 만큼 만들기
      const seats = Array.from({ length: count }).map(() =>
        this.seatsRepository.create({
          showId,
          reservationId: reservation,
        }),
      );
      return this.seatsRepository.save(seats);
    } else throw new NotFoundException('예매 가능한 좌석이 없거나 부족합니다');
  }

  //유저가 예약한 좌석
  async reservationSeat(userId: number, showId: number) {
    return await this.seatsRepository
      .createQueryBuilder('seat')
      .innerJoin('seat.reservation', 'reservation')
      .where('reservation.userId = :userId', { userId })
      .andWhere('reservation.isReservation = :status', { status: false })
      .andWhere('seat.showId = :showId', { showId })
      .getMany();
  }
}
