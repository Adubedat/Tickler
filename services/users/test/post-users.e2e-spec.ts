import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';

describe('Users service', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${process.env.USERS_SERVICE_HOST}-db:27017/${process.env.MONGO_DATABASE}`,
      { useNewUrlParser: true },
    );
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

  it('POST /users - should not create user without request body', (done) => {
    return request('http://localhost:3010')
      .post('/users/')
      .send()
      .expect(412)
      .expect({
        statusCode: 412,
        message:
          'User validation failed: username: Username can not be empty, password: Password can not be empty',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /users - should not create user with empty username', (done) => {
    const body = {
      username: '',
      password: 'password',
    };
    return request(app.getHttpServer())
      .post('/users/')
      .send(body)
      .expect(412)
      .expect({
        statusCode: 412,
        message: 'User validation failed: username: Username can not be empty',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /users - should not create user with empty password', (done) => {
    const body = {
      username: 'user',
      password: '',
    };
    return request(app.getHttpServer())
      .post('/users/')
      .send(body)
      .expect(412)
      .expect({
        statusCode: 412,
        message: 'User validation failed: password: Password can not be empty',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /users - should not create user with password too short', (done) => {
    const body = {
      username: 'user',
      password: 'short',
    };
    return request(app.getHttpServer())
      .post('/users/')
      .send(body)
      .expect(412)
      .expect({
        statusCode: 412,
        message:
          'User validation failed: password: Password should include at least 8 chars',
        error: 'Precondition Failed',
      })
      .end(done);
  });

  it('POST /users - should create user', (done) => {
    const body = {
      username: 'user',
      password: 'password',
    };
    return request(app.getHttpServer())
      .post('/users/')
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('User created');
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.username).toEqual('user');
        expect(res.body.data.role).toEqual('user');
      })
      .end(done);
  });

  it('POST /users - should not create user with already used username', (done) => {
    const body = {
      username: 'user',
      password: 'short',
    };
    return request(app.getHttpServer())
      .post('/users/')
      .send(body)
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'Username already exists',
        error: 'Conflict',
      })
      .end(done);
  });
});
