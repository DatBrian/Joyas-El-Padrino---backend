import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Exceptions } from './common/filters';
import * as morgan from 'morgan';
import { CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //*Log de peticiones
  app.use(morgan('dev'));
  //* Validación DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //*Habilitar class-transformer
  // const reflect = app.get(Reflector);
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(reflect));
  //* Filtro de errores
  app.useGlobalFilters(new Exceptions());
  //*Configurar CORS
  app.enableCors(CORS);
  //*Configurar prefix
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log(`Application running on : ${await app.getUrl()}`);
}
bootstrap();
