import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { PointsService } from '../points/points.service';
import { ShowsService } from '../shows/shows.service';
import { PointDto } from '../dto/point.dto';
import { SeatsService } from '../seats/seats.service';
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private pointsService: PointsService,
    private showsService: ShowsService,
    private seatsService: SeatsService,
  ) {}

  //공연 아이디와 유저 아이디가 일치하는 공연
  async findOne(userId: number, showId: number): Promise<Reservation> {
    const reservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :userId', { userId })
      .innerJoinAndSelect('reservation.seats', 'seat')
      .andWhere('seat.showId = :showId', { showId })
      .take(1)
      .getOne();

    return reservations;
  }

  async createReservations(userId: number) {
    const reservations = this.reservationRepository.create({ userId });
    return this.reservationRepository.save(reservations);
  }

  //예매하기 유저, 공연 아이디
  async reservation(
    userId: number,
    showId: number,
  ): Promise<{ message: string }> {
    const found = await this.findOne(userId, showId);
    if (!found || found.isReservation)
      throw new NotFoundException('해당하는 공연이 없습니다');
    const reservationId = found.id;

    //포인트 조회
    const seatCount = await (
      await this.seatsService.reservationSeat(userId, showId)
    ).length;
    const showPrice = await (await this.showsService.findOne(showId)).price;
    const price = seatCount * showPrice;
    //포인트 차감
    const userPoint = await (await this.pointsService.getTotal(userId)).total;
    if (price > userPoint)
      throw new NotFoundException('포인트가 충분하지 않습니다');
    const total: PointDto = { point: price, pointStatus: 0 };
    await this.pointsService.createPoint(userId, total);
    //예매되면 스테이터스 true
    await this.reservationRepository
      .createQueryBuilder('reservation')
      .update()
      .set({ isReservation: true })
      .where('reservation.id = :reservationId', { reservationId })
      .execute();

    return { message: '예약이 완료되었습니다' };
  }

  //예약 조회하기 userId로 true만
  async getReservation(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :userId', { userId })
      .andWhere('reservation.isReservation = :status', { status: true })
      .orderBy('reservation.updatedAt', 'DESC')
      .getMany();
  }
}
