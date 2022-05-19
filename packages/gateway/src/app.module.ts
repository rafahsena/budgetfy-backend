import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsController } from './accounts/accounts.controller';
import { TransactionsController } from './transactions/transactions.controller';
import config from './services/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [AccountsController, TransactionsController],
  providers: [
    {
      provide: 'ACCOUNT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const accountServiceConfig = configService.get('accountService');
        return ClientProxyFactory.create(accountServiceConfig);
      },
      inject: [ConfigService],
    },
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
export class AppModule {}
