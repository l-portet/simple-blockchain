import * as crypto from 'crypto';
import { Transaction, Block } from './index.js';

export class Chain {
  static #instance: Chain | null = null;
  blocks: Block[] = [];

  constructor() {
    if (Chain.#instance) {
      return Chain.#instance;
    }

    Chain.#instance = this;
    this.blocks = [new Block(null, new Transaction(100, 'genesis', 'satoshi'))];
  }

  get lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  mine(nonce: number): number {
    let solution = 1;

    console.log('⛏ Mining...');

    while (true) {
      const hash = crypto.createHash('MD5');

      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest('hex');

      if (attempt.substr(0, 4) === '0000') {
        console.log(`Solved! Solution: ${solution}`);
        return solution;
      }

      solution += 1;
    }
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: NodeJS.ArrayBufferView
  ): void {
    if (!this.verifyTransaction(transaction, senderPublicKey, signature)) {
      throw new Error('Transaction authenticity could not be verified.');
    }

    const newBlock = new Block(this.lastBlock.hash, transaction);

    this.blocks.push(newBlock);
  }

  verifyTransaction(
    transaction: Transaction,
    senderPublicKey: string,
    signature: NodeJS.ArrayBufferView
  ) {
    return crypto
      .createVerify('SHA256')
      .update(transaction.toString(), signature as any)
      .verify(senderPublicKey, signature);
  }
}

export default new Chain();
