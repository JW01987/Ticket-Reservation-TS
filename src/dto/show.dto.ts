import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class ShowDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: '제목은 최대 50자입니다' })
  title: string;

  desc: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  place: string;

  image: string;

  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsNumber()
  @IsNotEmpty()
  totalSeat: number;

  @IsArray()
  @IsNotEmpty()
  time: string[];
}
