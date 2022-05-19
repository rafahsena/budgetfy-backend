import { BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { TransactionsService } from './transactions.interface';

export class TransactionsTcpService implements TransactionsService {
  constructor(
    @Inject('TRANSACTION_SERVICE')
    private readonly transactionServiceClient: ClientProxy,
  ) {}

  async getAccountTransactions(accountId: number) {
    try {
      const transactions = await firstValueFrom(
        this.transactionServiceClient.send('getAccountTransactions', accountId),
      );
      return transactions;
    } catch (e) {
      console.error('Error at Gateway Transactions Service: ', e);
    }
  }

  createTransaction(transactionData) {
    const transaction = this.transactionServiceClient
      .send('createTransaction', transactionData)
      .pipe(
        catchError((error) => {
          return throwError(() => new BadRequestException(error));
        }),
      );
    return transaction;
  }

  async getAllTransactions() {
    try {
      const transactions = await firstValueFrom(
        this.transactionServiceClient.send('findAllTransaction', {}),
      );
      return transactions;
    } catch (e) {
      console.error('Error at Gateway Transactions Service: ', e);
    }
  }
}
