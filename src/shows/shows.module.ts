import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from '../entities/show.entity';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
