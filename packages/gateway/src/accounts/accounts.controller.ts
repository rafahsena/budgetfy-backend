import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject('ACCOUNT_SERVICE')
    private readonly accountServiceClient: ClientProxy,
  ) {}

  @Post()
  public async createAccount(@Body() accountInfo) {
    try {
      const account = await firstValueFrom(
        this.accountServiceClient.send('createAccount', accountInfo),
      );
      return account;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get()
  public async getAccounts() {
    const accounts = await firstValueFrom(
      this.accountServiceClient.send('findAllAccount', {}),
    );
    return accounts;
  }
}
