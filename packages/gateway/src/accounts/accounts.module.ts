import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AccountsController } from './accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [
    {
      provide: 'ACCOUNT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const accountServiceConfig = configService.get('accountService');
        return ClientProxyFactory.create(accountServiceConfig);
      },
      inject: [ConfigService],
    },
  ],
})
export class AccountsModule {}
