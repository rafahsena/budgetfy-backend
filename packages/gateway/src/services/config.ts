import { Transport } from '@nestjs/microservices';

export default () => ({
  port: process.env.API_GATEWAY_PORT,
  accountService: {
    options: {
      host: process.env.ACCOUNT_SERVICE_HOST,
      port: process.env.ACCOUNT_SERVICE_PORT,
    },
    transport: Transport.RMQ,
  },
  transactionService: {
    options: {
      urls: [process.env.TRANSACTION_SERVICE_RABBITMQ],
      queue: process.env.TRANSACTION_SERVICE_QUEUE_NAME,
      queueOptions: { durable: true },
    },
    transport: Transport.RMQ,
  },
});
