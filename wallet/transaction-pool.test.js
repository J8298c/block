const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
    tp.updateOrAddTransaction(transaction);
  });

  it('adds a transactin to the pool', () => {
    expect(tp.transaction.find(t => t.id === transaction.id)).toEqual(
      transaction
    );
  });

  it('updates the transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddre55', 40);

    tp.updateOrAddTransaction(newTransaction);

    expect(
      JSON.stringify(tp.transaction.find(t => t.id === newTransaction.id))
    ).not.toEqual(oldTransaction);
  });
});
