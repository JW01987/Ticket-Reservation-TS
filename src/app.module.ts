import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { ShowsModule } from './shows/shows.module';
import { Show } from './entities/show.entity';
import { PointsModule } from './points/points.module';
import { Point } from './entities/point.entity';
import { SeatsModule } from './seats/seats.module';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './entities/reservation.entity';
import { Seat } from './entities/seat.entity';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Show, Point, Reservation, Seat],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),

    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    AuthModule,
    UsersModule,
    ShowsModule,
    PointsModule,
    SeatsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
