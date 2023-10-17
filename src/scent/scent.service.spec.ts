import { Test, TestingModule } from '@nestjs/testing';
import { ScentService } from './scent.service';

describe('ScentService', () => {
  let service: ScentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScentService],
    }).compile();

    service = module.get<ScentService>(ScentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
