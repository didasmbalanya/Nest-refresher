import { Injectable } from '@nestjs/common';
import { Scent } from './entities/scent.entity';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';

@Injectable()
export class ScentService {
  private scents: Scent[] = [
    {
      id: 1,
      name: 'Pink Garden',
      brand: 'KS',
      flavors: ['Yellow Forrest'],
    },
  ];

  findAll(paginationQuery: object) {
    return this.scents || paginationQuery;
  }

  findOne(id: number) {
    return this.scents.find((sc) => sc.id === id);
  }

  create(createScenteDto: CreateScentDto) {
    const id = this.scents.length;
    this.scents.push({ id, ...createScenteDto });
    return this.scents.length;
  }

  update(updateScentDto: UpdateScentDto) {
    return updateScentDto;
  }
}
