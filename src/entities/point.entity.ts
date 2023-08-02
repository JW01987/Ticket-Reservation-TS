import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point: number;

  @Column()
  pointStatus: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.points)
  user: User;
}
