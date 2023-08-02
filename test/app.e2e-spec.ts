import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/signup (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/users/signup')
  //     .send({
  //       email: 'test123@test.com',
  //       password: 'test123',
  //       name: 'test',
  //     })
  //     .expect(200);
  // });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test123@test.com',
        password: 'test123',
      })
      .expect(200);
  });
});
