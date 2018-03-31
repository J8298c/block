const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
        publickKey: ${this.publicKey.toString()}
        balance: ${this.balance}
      `;
  }

  /**
   *
   * @param {signature unique for transactions} dataHash
   */
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = Wallet;
