import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { validTicket } from './mock/validTicket.mock';
import { validUserAdmin } from './mock/validUserAdmin.mock';

describe('Tickets service', () => {
  let app: INestApplication;
  let jwt: string;
  let userId: string;
  let ticketId: string;
  const usersServiceUrl = `http://${process.env.USERS_SERVICE_HOST}:${process.env.USERS_SERVICE_PORT}`;

  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${process.env.USERS_SERVICE_HOST}-db:27017/${process.env.MONGO_DATABASE}`,
      { useNewUrlParser: true },
    );
    await mongoose.connection.dropDatabase();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(usersServiceUrl).post('/users/').send(validUserAdmin);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth - should return jwt', (done) => {
    return request(usersServiceUrl)
      .post('/auth/')
      .send(validUserAdmin)
      .expect(200)
      .expect((res) => {
        jwt = res.body.data.access_token;
        userId = res.body.data.id;
      })
      .end(done);
  });

  it('POST /tickets - should create ticket', (done) => {
    const body = validTicket;
    body.creator_id = userId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${jwt}`)
      .send(body)
      .expect(201)
      .expect((res) => {
        ticketId = res.body.data._id;
      })
      .end(done);
  });

  it('POST /tickets - should create ticket', (done) => {
    const body = validTicket;
    body.creator_id = userId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${jwt}`)
      .send(body)
      .expect(201)
      .end(done);
  });

  it('GET /tickets - should error without jwt', (done) => {
    return request(app.getHttpServer())
      .get('/tickets')
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('GET /tickets - should success', (done) => {
    return request(app.getHttpServer())
      .get('/tickets')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('Tickets found');
        expect(res.body.data.length > 1).toBeTruthy();
      })
      .end(done);
  });

  it('GET /tickets/:id - should error without jwt', (done) => {
    return request(app.getHttpServer())
      .get(`/tickets/${ticketId}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('GET /tickets/:id - should error with invalid id', (done) => {
    return request(app.getHttpServer())
      .get(`/tickets/wrongId`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Invalid parameters',
        error: 'Bad Request',
      })
      .end(done);
  });

  it('GET /tickets/:id - should success', (done) => {
    return request(app.getHttpServer())
      .get(`/tickets/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('Ticket found');
        expect(res.body.data._id).toBeDefined();
        expect(res.body.data.status).toEqual(validTicket.status);
        expect(res.body.data.severity).toEqual(validTicket.severity);
        expect(res.body.data.priority).toEqual(validTicket.priority);
        expect(res.body.data.title).toEqual(validTicket.title);
        expect(res.body.data.description).toEqual(validTicket.description);
        expect(res.body.data.creator_id).toEqual(userId);
      })
      .end(done);
  });
});
