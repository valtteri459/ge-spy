import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ge spy rest API')
    .setDescription('REST queries available on this host, see <a href="/socket">here</a> for realtime socket.io api docs')
    .setVersion('1.0')
    .build();

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Ge price websocket api')
    .setDescription('Realtime queries and updates for prices more efficiently, rest api available <a href="/api">here</a>')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    //.addSecurity('user-password', {type: 'userPassword'})
    .addServer('gespy', {
        url: process.env.NODE_ENV === 'production' ? `wss://${process.env.HOSTNAME}/realtime` : 'ws://localhost:4000/realtime',
        protocol: 'socket.io',
    })
    .build();

const asyncapiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions);
await AsyncApiModule.setup('socket', app, asyncapiDocument);

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000);
}
bootstrap();
