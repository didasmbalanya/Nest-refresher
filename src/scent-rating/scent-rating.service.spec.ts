import { Test, TestingModule } from '@nestjs/testing';
import { ScentRatingService } from './scent-rating.service';

describe('ScentRatingService', () => {
  let service: ScentRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScentRatingService],
    }).compile();

    service = module.get<ScentRatingService>(ScentRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
