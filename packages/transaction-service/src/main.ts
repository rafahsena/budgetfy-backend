import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  RpcException,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { TransactionModule } from './transaction/transaction.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.QUEUE_NAME,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
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
