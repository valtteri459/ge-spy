import { Module, ValidationPipe } from '@nestjs/common';
import { ItemFetcherModule } from './modules/item-fetcher/item-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ItemModule } from './modules/item/item.module';
import { APP_PIPE } from '@nestjs/core';
import { PriceModule } from './modules/price/price.module';
config({path: process.env.NODE_ENV !== 'production' ? '.env.development' : ''})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ItemFetcherModule,
    ItemModule,
    PriceModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ]
})
export class AppModule {}
