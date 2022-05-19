import { Transport } from '@nestjs/microservices';

export default () => ({
  port: process.env.API_GATEWAY_PORT,
  accountService: {
    options: {
      host: process.env.ACCOUNT_SERVICE_HOST,
    },
    transport: Transport.TCP,
  },
  transactionService: {
    options: {
      host: process.env.TRANSACTION_SERVICE_HOST,
    },
    transport: Transport.TCP,
  },
});
