import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { validUser } from './mocks/ValidUser';

describe('Auth service', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${process.env.USERS_SERVICE_HOST}-db:27017/${process.env.MONGO_DATABASE}`,
      { useNewUrlParser: true },
    );
    console.log('AUTH');
    await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /users - should create user', (done) => {
    return request(app.getHttpServer())
      .post('/users/')
      .send(validUser)
      .expect(201)
      .end(done);
  });

  it('POST /auth - should error with empty body', (done) => {
    return request(app.getHttpServer())
      .post('/auth/')
      .send()
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('POST /auth - should error with invalid credentials', (done) => {
    const body = {
      username: 'invalid',
      password: 'invalid',
    };
    return request(app.getHttpServer())
      .post('/auth/')
      .send(body)
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('POST /auth - should return jwt and user with valid credentials', (done) => {
    return request(app.getHttpServer())
      .post('/auth/')
      .send(validUser)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('User authenticated');
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.username).toEqual(validUser.username);
        expect(res.body.data.role).toEqual('user');
        expect(res.body.data.access_token).toBeDefined();
      })
      .end(done);
  });
});
