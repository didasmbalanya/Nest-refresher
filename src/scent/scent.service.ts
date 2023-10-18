import { Injectable, NotFoundException } from '@nestjs/common';
import { Scent } from './entities/scent.entity';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity.ts';

@Injectable()
export class ScentService {
  constructor(
    @InjectRepository(Scent)
    private readonly scentRepository: Repository<Scent>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll(paginationQuery: object) {
    return this.scentRepository.find({
      relations: { flavors: true },
      ...paginationQuery,
    });
  }

  async findOne(id: string) {
    const scent = await this.scentRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!scent) throw new NotFoundException(`Scent #${id} not found`);
    return scent;
  }

  async create(createScenteDto: CreateScentDto) {
    const flavors = await Promise.all(
      createScenteDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const scent = this.scentRepository.create({ ...createScenteDto, flavors });
    return this.scentRepository.save(scent);
  }

  async update(id: string, updateScentDto: UpdateScentDto) {
    const flavors =
      updateScentDto.flavors &&
      (await Promise.all(
        updateScentDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const scent = await this.scentRepository.preload({
      id: +id,
      ...updateScentDto,
      flavors,
    });

    if (!scent) throw new NotFoundException(`Scent #${id} not found`);
    return this.scentRepository.save(scent);
  }

  async remove(id: string) {
    const scent = await this.findOne(id);
    return this.scentRepository.remove(scent);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existsingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existsingFlavor) return existsingFlavor;
    return this.flavorRepository.create({ name });
  }
}
