export interface TransactionsService {
  createTransaction(transactionData);
  getAllTransactions();
  getAccountTransactions(accountId);
}
