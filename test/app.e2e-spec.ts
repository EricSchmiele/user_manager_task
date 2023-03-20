import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpModule } from '../src/infra/http/http-module';
import { InMemoryDatabaseModule } from './repositories/in-memory-database-module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  jest.setTimeout(20000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, InMemoryDatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('api/user/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/hello')
      .expect(200)
      .expect('Hello!!');
  });

  it('api/user/:id (GET)', () => {
    return request(app.getHttpServer()).get('/api/user/2').expect(200).expect({
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    });
  });

  it('api/users/addall (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users/addall')
      .send({})
      .expect(201);
  });

  // it('api/users (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/api/users')
  //     .send({
  //       email: 'eric.robotic@gmail.com',
  //       first_name: 'Eric',
  //       last_name: 'Schmiele',
  //       avatar: 'https://reqres.in/img/faces/12-image.jpg',
  //     })
  //     .expect(201);
  // });

  it('api/user/:id/fromdb (GET)', async () => {
    await sleep(15000);
    return request(app.getHttpServer())
      .get('/api/user/2/fromdb')
      .expect(200)
      .expect({
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      });
  });

  it('api/user/:id/avatar (GET)', () => {
    return request(app.getHttpServer()).get('/api/user/2/avatar').expect(200);
  });

  it('api/user/:id/avatar (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/user/2/avatar')
      .expect(200);
  });
});
