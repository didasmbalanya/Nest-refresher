import { Module } from '@nestjs/common';
import { ScentRatingService } from './scent-rating.service';

@Module({
  providers: [ScentRatingService],
  imports: [],
})
export class ScentRatingModule {}
