import { WithdrawMoneyResponse } from './withdraw-response';

export interface IWithdraw {
  withdrawMoney: (
    representativeCpf: number,
    amount: number
  ) => Promise<WithdrawMoneyResponse>;
}
