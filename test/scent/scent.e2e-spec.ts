import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScentModule } from '../../src/scent/scent.module';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { WrapResponseInterceptor } from '../../src/common/interceptors/wrap-response.interceptor';
import { CreateScentDto } from '../../src/scent/dto/create-scent.dto';
import { UpdateScentDto } from '../../src/scent/dto/update-scent.dto';

describe('[Feature] Scent - /scents', () => {
  const scent = {
    name: 'Pink Garden',
    brand: 'Flower one',
    flavors: ['Yellow', 'Blue'],
  };
  // const expectedPartialScent = expect.objectContaining({
  //   ...scent,
  //   description: null,
  //   recommendations: 0,
  //   // flavors: expect.arrayContaining(
  //   //   scent.flavors.map((name) => expect.objectContaining({ name })),
  //   // ),
  // });

  let app: INestApplication;
  let httpServer: HttpServer;
  let scentId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ScentModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
      new WrapResponseInterceptor(),
      // new TimeoutInterceptor(),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/scent')
      .send(scent as CreateScentDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        // expect(body).toEqual(expectedPartialScent);
        scentId = body.data.id;

        expect(body).toBeDefined();
      });
  });

  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/scent')
      .then(({ body }) => {
        expect(body.data.length).toBeGreaterThan(0);
        // expect(body[0]).toEqual(expectedPartialScent);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get(`/scent/${scentId}`)
      .then(({ body }) => {
        expect(body).toBeDefined();
        // expect(body).toEqual(expectedPartialScent);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateScentDto: UpdateScentDto = {
      ...scent,
      name: 'New and Improved Shipwreck Roast',
    };
    return request(httpServer)
      .patch(`/scent/${scentId}`)
      .send(updateScentDto)
      .then(({ body }) => {
        expect(body.data.name).toEqual(updateScentDto.name);

        return request(httpServer)
          .get(`/scent/${scentId}`)
          .then(({ body }) => {
            expect(body.data.name).toEqual(updateScentDto.name);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete(`/scent/${scentId}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer).get('/scent/1').expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
