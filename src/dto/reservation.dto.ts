import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ReservationDto {
  @IsNumber()
  @IsNotEmpty()
  showId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count: number;
}
