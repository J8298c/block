const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  toString() {
    return `Block -
		Timestamp: ${this.timestamp}
		Last Hash: ${this.lastHash.toString(0, 10)}
		Hash	 : ${this.hash.toString(0, 10)}
    Nonce	 : ${this.nonce}
    DIFFULTY: ${this.difficulty}
    DATA	 : ${this.data};
		`;
  }
  /**
   * init block called genesis with hardcoded data
   */
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
  }

  /**
   *
   * @param {*} lastBlock shows last link on chain
   * @param {*} data info being passed along ie 'jeans, money'
   * mines a new block to be passed around
   */
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;
    let { difficulty } = lastBlock;

    //while loop to ensure hash lead === DIFFICULTY
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }
  /**
   *
   * @param {*} timestamp  time stamp of when block was created
   * @param {*} lastHash hash of last block on chain
   * @param {*} data info being passed around
   */
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  /**
   * adjust diffculty based on timestamp of block that came before
   * @param {*} lastBlock previous block
   * @param {*} currentTime
   */
  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
