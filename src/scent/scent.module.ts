import { Module } from '@nestjs/common';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scent } from './entities/scent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scent])],
  controllers: [ScentController],
  providers: [ScentService],
})
export class ScentModule {}
