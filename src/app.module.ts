import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScentModule } from './scent/scent.module';
import { ScentRatingModule } from './scent-rating/scent-rating.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    ScentModule,
    ScentRatingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
