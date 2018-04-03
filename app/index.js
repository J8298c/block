const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const PeerToPeerServer = require('./peertopeerserver');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new PeerToPeerServer(bc, tp);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`new block added: ${block.toString()}`);

  p2pServer.syncChain(); //sync chains within all peers
  res.redirect('/blocks');
});

app.get('/transactions', (req, res) => {
  res.json(tp.transaction);
});

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/public-key', (req, res) => {
  res.json({publicKey: wallet.publicKey})
})

app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});

p2pServer.listen();
