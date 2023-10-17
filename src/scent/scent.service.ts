import { Injectable } from '@nestjs/common';
import { Scent } from './entities/scent.entity';

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

  get() {
    return this.scents;
  }
}
