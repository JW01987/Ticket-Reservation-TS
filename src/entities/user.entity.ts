import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from './point.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Point, (point) => point.user)
  points: Point[];
}
