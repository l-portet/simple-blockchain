import * as crypto from 'crypto';
import { Transaction } from './index.js';

export default class Block {
  prevHash: string | null = '';
  transaction: Transaction;
  ts: number = 0;
  nonce = Math.round(Math.random() * 999999999);

  constructor(
    prevHash: string | null,
    transaction: Transaction,
    ts: number = 0
  ) {
    this.prevHash = prevHash;
    this.transaction = transaction;
    this.ts = ts;
  }

  get hash() {
    const content = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');

    hash.update(content).end();
    return hash.digest('hex');
  }
}
