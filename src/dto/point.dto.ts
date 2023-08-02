import { IsNotEmpty, IsNumber } from 'class-validator';

export class PointDto {
  @IsNumber()
  @IsNotEmpty()
  point: number;

  @IsNumber()
  @IsNotEmpty()
  pointStatus: number;
}
