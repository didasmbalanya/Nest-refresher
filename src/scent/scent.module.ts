import { Module } from '@nestjs/common';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scent } from './entities/scent.entity';
import { Flavor } from './entities/flavor.entity.ts';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scent, Flavor, Event])],
  controllers: [ScentController],
  providers: [ScentService],
})
export class ScentModule {}
