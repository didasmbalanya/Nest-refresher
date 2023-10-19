import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScentModule } from './scent/scent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScentRatingModule } from './scent-rating/scent-rating.module';

@Module({
  imports: [
    ScentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScentRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
