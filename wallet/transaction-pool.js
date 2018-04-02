class TransactionPool {
  constructor() {
    this.transaction = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transaction.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transaction[
        this.transaction.indexOf(transactionWithId)
      ] = transaction;
    } else {
      this.transaction.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transaction.find(t => t.input.address === address);
  }
}

module.exports = TransactionPool;
