import { Test, TestingModule } from '@nestjs/testing';
import { ScentController } from './scent.controller';

describe('ScentController', () => {
  let controller: ScentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScentController],
    }).compile();

    controller = module.get<ScentController>(ScentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
