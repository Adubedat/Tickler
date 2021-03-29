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

  it('DELETE /tickets/:id - should not delete without jwt', (done) => {
    return request(app.getHttpServer())
      .delete(`/tickets/${userTicketId}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('DELETE /tickets/:id - should not delete with wrong ticketId', (done) => {
    return request(app.getHttpServer())
      .delete(`/tickets/wrongId`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('DELETE /tickets/:id - should not delete if user is not ticket owner', (done) => {
    return request(app.getHttpServer())
      .delete(`/tickets/${adminTicketId}`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(403)
      .expect({
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      })
      .end(done);
  });

  it('DELETE /tickets/:id - should delete if user is ticket owner', (done) => {
    return request(app.getHttpServer())
      .delete(`/tickets/${userTicketId}`)
      .set('Authorization', `Bearer ${userJwt}`)
      .expect(200)
      .expect({
        status: 200,
        message: 'Ticket deleted',
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

  it('DELETE /tickets/:id - should delete if user is not owner but is admin', (done) => {
    return request(app.getHttpServer())
      .delete(`/tickets/${userTicketId}`)
      .set('Authorization', `Bearer ${adminJwt}`)
      .expect(200)
      .expect({
        status: 200,
        message: 'Ticket deleted',
      })
      .end(done);
  });
});
