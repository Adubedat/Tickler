import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { validUser } from './mocks/ValidUser.mock';

describe('Auth service', () => {
  let app: INestApplication;
  let jwt: string;

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

  it('POST /users - should create user', (done) => {
    return request(app.getHttpServer())
      .post('/users/')
      .send(validUser)
      .expect(201)
      .end(done);
  });

  it('POST /users - should create a second user', (done) => {
    return request(app.getHttpServer())
      .post('/users/')
      .send({ username: 'user2', password: 'password' })
      .expect(201)
      .end(done);
  });

  it('POST /auth - should return jwt', (done) => {
    return request(app.getHttpServer())
      .post('/auth/')
      .send(validUser)
      .expect(200)
      .expect((res) => {
        jwt = res.body.data.access_token;
      })
      .end(done);
  });

  it('GET /users - should error without jwt', (done) => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(401)
      .expect({
        statusCode: 401,
        message: 'Unauthorized',
      })
      .end(done);
  });

  it('GET /users - should success', (done) => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('Users found');
        expect(res.body.data).toBeDefined();
      })
      .end(done);
  });

  it('GET /users/me - should get jwts owner profile', (done) => {
    return request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('User found');
        expect(res.body.data.username).toEqual(validUser.username);
      })
      .end(done);
  });
});
