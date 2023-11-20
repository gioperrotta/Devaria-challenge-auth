import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Estudos NESTJS')
    .setDescription(
      'Projeto experimental que implementa um sistema de autorização e autenticação com JWT utilizando NESTJS.',
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('address')
    .addTag('role')
    .addTag('franchise-unit')
    .addTag('hello')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://armazem21.com.br',
  //     'https://armazem21.com.br',
  //   ],
  //   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  //   credentials: true,
  // });

  await app.listen(PORT);
}
bootstrap();
