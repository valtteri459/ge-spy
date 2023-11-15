import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ge spy rest API')
    .setDescription('http queries available on this host')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
