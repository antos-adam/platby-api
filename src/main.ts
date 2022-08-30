import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin"
  });
  var server_port = process.env.PORT || 443;
  await app.listen(server_port);
}
bootstrap();
