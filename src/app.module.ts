import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScentModule } from './scent/scent.module';

@Module({
  imports: [ScentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
