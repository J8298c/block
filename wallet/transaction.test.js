const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('outputs the `amount` subtracted from wallets balance', () => {
    expect(
      transaction.outputs.find(output => output.address === wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });

  it('outputs amount added to the recipient', () => {
    expect(
      transaction.outputs.find(output => output.address === recipient).amount
    ).toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  describe('transaction that exceeds the wallet balance', () => {
    beforeEach(() => {
      absurdAmount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, absurdAmount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });
});