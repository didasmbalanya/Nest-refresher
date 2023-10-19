import { Injectable } from '@nestjs/common';
import { ScentService } from 'src/scent/scent.service';

@Injectable()
export class ScentRatingService {
  constructor(private readonly scentService: ScentService) {}
}
