import { Module } from '@nestjs/common';
import { ItemFetcherModule } from './modules/item-fetcher/item-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ItemModule } from './modules/item/item.module';
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
    ItemModule
  ],
})
export class AppModule {}
