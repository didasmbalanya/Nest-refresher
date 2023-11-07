import { Test, TestingModule } from '@nestjs/testing';
import { ScentRatingService } from './scent-rating.service';
// import { ScentModule } from '../scent/scent.module';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from '../scent/entities/flavor.entity.ts';
import { Scent } from '../scent/entities/scent.entity';

describe('ScentRatingService', () => {
  let service: ScentRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScentRatingService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} }, //
        { provide: getRepositoryToken(Event), useValue: {} },
        { provide: getRepositoryToken(Scent), useValue: {} },
      ],
      // imports: [ScentModule],
    }).compile();

    service = module.get<ScentRatingService>(ScentRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
