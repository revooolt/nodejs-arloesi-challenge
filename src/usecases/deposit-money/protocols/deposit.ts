import { DepositResponse } from './deposit-response';

export interface IDeposit {
  depositMoney: (
    representativeCpf: number,
    amount: number
  ) => Promise<DepositResponse>;
}
