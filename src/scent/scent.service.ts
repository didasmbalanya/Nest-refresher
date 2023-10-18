import { Injectable, NotFoundException } from '@nestjs/common';
import { Scent } from './entities/scent.entity';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScentService {
  constructor(
    @InjectRepository(Scent)
    private readonly scentRepository: Repository<Scent>,
  ) {}

  async findAll(paginationQuery: object) {
    return this.scentRepository.find(paginationQuery);
  }

  async findOne(id: string) {
    return this.scentRepository.findOne({ where: { id: +id } });
  }

  async create(createScenteDto: CreateScentDto) {
    const scent = this.scentRepository.create(createScenteDto);
    return this.scentRepository.save(scent);
  }

  async update(id: string, updateScentDto: UpdateScentDto) {
    const scent = await this.scentRepository.preload({
      id: +id,
      ...updateScentDto,
    });

    if (!scent) throw new NotFoundException(`Scent #${id} not found`);
    return this.scentRepository.save(scent);
  }

  async remove(id: string) {
    const scent = await this.findOne(id);
    return this.scentRepository.remove(scent);
  }
}
