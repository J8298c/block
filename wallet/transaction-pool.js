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

  validTransactions() {
    return this.transaction.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);

      if(transaction.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${transaction.input.address}`);
        return;
      }

      if(!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}`);
        return;
      }

      return transaction;
    })
  }
}

module.exports = TransactionPool;
