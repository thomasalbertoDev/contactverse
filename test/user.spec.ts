import * as request from 'supertest';
import { Logger } from 'winston';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('User Controller ', () => {
  let app: INestApplication;
  let logger: Logger;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
  });

  describe('POST /api/users', () => {
    it('should be rejected with 400 if username already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(201);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
    });

    it('should be rejected if username already exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(409);
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    it('Bad Request Test', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('Success Test', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'xRiot2',
          password: '12345678',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('xRiot2');
      expect(response.body.data.name).toBeDefined();
      expect(response.body.data.token).toBeDefined();
    });

    it('Unauthorized Test', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'sdas',
          password: 'sdasd',
        });

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.error).toBeDefined();
    });
  });

  describe('GET /api/users/current', () => {
    it('Unauthorized Test', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('authorization', 'wrong token');

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('Success Test', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('authorization', '2aa87a4b-b366-4214-bc13-a94865bf9bba');

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('xRiot2');
      expect(response.body.data.name).toBeDefined();
    });
  });

  describe('PATCH /api/users/current', () => {
    it('Bad Request Test', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('authorization', '2aa87a4b-b366-4214-bc13-a94865bf9bba')
        .send({
          name: '',
          password: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('Success Test', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('authorization', 'e0cfae0c-5174-4dbf-bc70-acd9382e1d8b')
        .send({
          name: 'Thomas Ok',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBeDefined();
    });

    it('Unauthorized Test', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .send({
          name: 'sdas',
          password: 'sdasd',
        });

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.error).toBeDefined();
    });
  });
});
