import { Test, TestingModule } from '@nestjs/testing';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity.ts';
import { Scent } from './entities/scent.entity';
import { Event } from '../events/entities/event.entity';

describe('ScentController', () => {
  let controller: ScentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScentController],
      providers: [
        ScentService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} }, //
        { provide: getRepositoryToken(Event), useValue: {} },
        { provide: getRepositoryToken(Scent), useValue: {} },
      ],
    }).compile();

    controller = module.get<ScentController>(ScentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
