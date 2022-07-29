export default class Transaction {
  amount: number = 0;
  payer: string = '';
  payee: string = '';

  constructor(amount: number, payer: string, payee: string) {
    this.amount = amount;
    this.payer = payer;
    this.payee = payee;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
