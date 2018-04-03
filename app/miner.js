class Miner {
	constructor(blockchain, transactionPool, wallet, p2pServer) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.p2pServer = p2pServer;
	}

	mine() {
		const validTransaction = this.transactionPool.validTransaction();
		//include reward for the miner
		//create a block including the valid transaction
		//sync chains in p2pserver
		//clear the transaction pool
		//broadcast to all miners to clear thier transaction pool
	}
}


module.exports = Miner;