import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
