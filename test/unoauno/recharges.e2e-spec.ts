import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Recharges (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 1Registrar usuario
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'test',
        password: '1234',
      });

    // 2️ Login
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: '1234',
      });

    expect(loginResponse.status).toBe(201); 
    expect(loginResponse.body.token).toBeDefined();

    token = loginResponse.body.token;
  });

  it('/recharges/buy (POST) - success', async () => {
    await request(app.getHttpServer())
      .post('/recharges/buy')
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: '3123456789',
        amount: 5000,
      })
      .expect(201);
  });

  it('/recharges/buy (POST) - invalid phone', async () => {
    await request(app.getHttpServer())
      .post('/recharges/buy')
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: '9123456789',
        amount: 5000,
      })
      .expect(400);
  });

  it('/recharges/history (GET)', async () => {
    await request(app.getHttpServer())
      .get('/recharges/history')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
