import { Module } from '@nestjs/common';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scent } from './entities/scent.entity';
import { Flavor } from './entities/flavor.entity.ts';
import { Event } from 'src/events/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import scentConfig from './config/scent.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Scent, Flavor, Event]),
    ConfigModule.forFeature(scentConfig),
  ],
  exports: [ScentService],
  controllers: [ScentController],
  providers: [ScentService],
})
export class ScentModule {}
