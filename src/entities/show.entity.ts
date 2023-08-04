import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Seat } from './seat.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  title: string;

  @Column({ nullable: true, length: 200 })
  desc: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  place: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false })
  category: number;

  @Column({ nullable: false })
  totalSeat: number;

  @Column({ nullable: false })
  time: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Seat, (seat) => seat.show)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];
}
