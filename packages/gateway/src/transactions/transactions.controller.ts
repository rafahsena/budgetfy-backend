import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('TRANSACTION_SERVICE')
    private readonly transactionServiceClient: ClientProxy,
  ) {}

  @Post()
  createNewTransaction(@Body() transactionData) {
    try {
      const transaction = this.transactionServiceClient
        .send('createTransaction', transactionData)
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error);
          }),
        );
      return transaction;
    } catch (e) {}
  }

  @Get()
  async getAllTransactions() {
    const transactions = await firstValueFrom(
      this.transactionServiceClient.send('findAllTransaction', {}),
    );
    return transactions;
  }
}
