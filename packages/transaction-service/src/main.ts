import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { TransactionModule } from './transaction/transaction.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TransactionModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) =>
        new RpcException(
          errors.map(
            (error) => error.constraints[Object.keys(error.constraints)[0]],
          ),
        ),
    }),
  );
  await app.listen();
}
bootstrap();
