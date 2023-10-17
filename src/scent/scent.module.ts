import { Module } from '@nestjs/common';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';

@Module({
  controllers: [ScentController],
  providers: [ScentService],
})
export class ScentModule {}
