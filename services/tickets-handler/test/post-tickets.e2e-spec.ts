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
  const usersServiceUrl = `http://${process.env.USERS_SERVICE_HOST}:${process.env.USERS_SERVICE_PORT}`;

  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${process.env.TICKETS_HANDLER_SERVICE_HOST}-db:27017/${process.env.MONGO_DATABASE}`,
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

  it('POST /tickets - should not create ticket without request body', (done) => {
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${jwt}`)
      .send()
      .expect(412)
      .expect({
        statusCode: 412,
        message:
          'Ticket validation failed: creator_id: Path `creator_id` is required., title: Title can not be empty',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /tickets - should not create ticket without title', (done) => {
    const body = validTicket;
    body.title = '';
    body.creator_id = userId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .set('Authorization', `Bearer ${jwt}`)
      .send(body)
      .expect(412)
      .expect({
        statusCode: 412,
        message: 'Ticket validation failed: title: Title can not be empty',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /tickets - should not create ticket without jwt', (done) => {
    const body = validTicket;
    body.title = 'title';
    body.creator_id = userId;
    return request(app.getHttpServer())
      .post('/tickets/')
      .send(body)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
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
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('Ticket created');
        expect(res.body.data._id).toBeDefined();
        expect(res.body.data.status).toEqual(body.status);
        expect(res.body.data.severity).toEqual(body.severity);
        expect(res.body.data.priority).toEqual(body.priority);
        expect(res.body.data.title).toEqual(body.title);
        expect(res.body.data.description).toEqual(body.description);
        expect(res.body.data.creator_id).toEqual(userId);
      })
      .end(done);
  });
});
