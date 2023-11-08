import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Scent, ScentSchema } from './entities/scent.entity';
import { ScentController } from './scent.controller';
import { ScentService } from './scent.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scent.name, schema: ScentSchema }]),
  ],
  controllers: [ScentController],
  providers: [ScentService],
})
export class ScentModule {}
