import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TransactionsTcpService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsTcpService) {}

  @Post()
  createNewTransaction(@Body() transactionData) {
    try {
      return this.transactionsService.createTransaction(transactionData);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get()
  getAllTransactions() {
    try {
      return this.transactionsService.getAllTransactions();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('account/:accountId')
  getAccountTransactions(@Param('accountId', ParseIntPipe) accountId: number) {
    try {
      return this.transactionsService.getAccountTransactions(accountId);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
