import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { validTicket } from './mock/validTicket.mock';
import { validUserAdmin } from './mock/validUserAdmin.mock';
import { validUser } from './mock/validUser.mock';

describe('Tickets service', () => {
  let app: INestApplication;
  let adminJwt: string;
  let userJwt: string;
  let adminId: string;
  let userId: string;
  let adminTicketId: string;
  let userTicketId: string;
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
    await request(usersServiceUrl).post('/users/').send(validUser);
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
        adminJwt = res.body.data.access_token;
        adminId = res.body.data.id;
      })
      .end(done);
  });

  it('POST /auth - should return jwt', (done) => {
    return request(usersServiceUrl)
      .post('/auth/')
      .send(validUser)
      .expect(200)
      .expect((res) => {
        userJwt = res.body.data.access_token;
        userId = res.body.data.id;
      })
      .end(done);
  });

  it('POST /tickets - should create ticket', (done) => {
    const body = validTicket;
    body.creator_id = adminId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${adminJwt}`)
      .send(body)
      .expect(201)
      .expect((res) => {
        adminTicketId = res.body.data._id;
      })
      .end(done);
  });

  it('POST /tickets - should create ticket', (done) => {
    const body = validTicket;
    body.creator_id = userId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${userJwt}`)
      .send(body)
      .expect(201)
      .expect((res) => {
        userTicketId = res.body.data._id;
      })
      .end(done);
  });

  it('PATCH /tickets/:id - should not update without jwt', (done) => {
    return request(app.getHttpServer())
      .patch(`/tickets/${userTicketId}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('PATCH /tickets/:id - should not update with wrong ticketId', (done) => {
    return request(app.getHttpServer())
      .patch(`/tickets/wrongId`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('PATCH /tickets/:id - should not update if user is not ticket owner', (done) => {
    return request(app.getHttpServer())
      .patch(`/tickets/${adminTicketId}`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(403)
      .expect({
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      })
      .end(done);
  });

  it('PATCH /tickets/:id - should update if user is ticket owner', (done) => {
    return request(app.getHttpServer())
      .patch(`/tickets/${userTicketId}`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('Ticket updated');
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

  it('PATCH /tickets/:id - should update if user is not owner but is admin', (done) => {
    return request(app.getHttpServer())
      .patch(`/tickets/${userTicketId}`)
      .set('Authorization', `Bearer ${adminJwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('Ticket updated');
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
