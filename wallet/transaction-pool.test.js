const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('r4nd-4dr355', 30, tp);
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
  it('clears transactions', () => {
    tp.clear();
    expect(tp.transaction).toEqual([]);
  });
  describe('mixing valid and corrupt transactions', () => {
    let validTransaction;

    beforeEach(() => {
      validTransaction = [...tp.transaction];
      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4ddress', 30, tp);
        if (i % 2 === 0) {
          transaction.input.amount = 99999;
        } else {
          validTransaction.push(transaction);
        }
      }
    });

    it('shouws a diff between valid and corrupt transaction', () => {
      expect(JSON.stringify(tp.transaction)).not.toEqual(
        JSON.stringify(validTransaction)
      );
    });

    it('grabs valid transaction', () => {
      expect(tp.validTransactions()).toEqual(validTransaction);
    });
  });
});
