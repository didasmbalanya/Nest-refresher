import { Module } from '@nestjs/common';
import { ScentRatingService } from './scent-rating.service';
import { ScentModule } from 'src/scent/scent.module';

@Module({
  providers: [ScentRatingService],
  imports: [ScentModule],
})
export class ScentRatingModule {}
