import { envs } from '@common/config/environment-config';
import { HttpExceptionFilter } from '@common/filters/exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  // cookie
  app.use(cookieParser());

  // filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // interceptors
  // app.useGlobalInterceptors(new ResponseInterceptor());

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // cors
  app.enableCors();

  // swagger config
  const config = new DocumentBuilder()
    .addCookieAuth('Authentication')
    .setTitle('Example')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  // port
  await app.listen(envs.port);
  logger.log(
    `project running in a ${envs.nodeEnv.toLocaleUpperCase()} environment`,
  );
}
bootstrap();
