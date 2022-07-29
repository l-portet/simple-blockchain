import { Wallet, chain } from '../src/index.js';

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(JSON.stringify(chain, null, 2));
chain.mine(0);
