import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ScentService } from './scent.service';
import { Event } from '../events/entities/event.entity';
import { Flavor } from './entities/flavor.entity.ts';
import { Scent } from './entities/scent.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe('ScentService', () => {
  let service: ScentService;
  let scentRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScentService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Event),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Scent),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ScentService>(ScentService);
    scentRepository = module.get<MockRepository>(getRepositoryToken(Scent));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the scent object', async () => {
        const scentId = '1';
        const expectedScent = {};

        scentRepository.findOne.mockReturnValue(expectedScent);
        const scent = await service.findOne(scentId);
        expect(scent).toEqual(expectedScent);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const scentId = '1';
        scentRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(scentId);
          expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Scent #${scentId} not found`);
        }
      });
    });
  });
});
