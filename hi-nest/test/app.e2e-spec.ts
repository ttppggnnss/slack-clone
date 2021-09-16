import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome my Movie API');
    });
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect('[]');
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2021,
          genres: ['test'],
          director: 't est',
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2021,
          genres: ['test'],
          director: 't est',
          other: 'test',
        })
        .expect(400);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/0').expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'Update Test',
        })
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
