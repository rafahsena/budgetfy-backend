import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TransactionsController } from './transactions.controller';
import { TransactionsTcpService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsTcpService,
    {
      provide: 'TRANSACTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const transactionServiceConfig =
          configService.get('transactionService');
        return ClientProxyFactory.create(transactionServiceConfig);
      },
      inject: [ConfigService],
    },
  ],
})
export class TransactionsModule {}
