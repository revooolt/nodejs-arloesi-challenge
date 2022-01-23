import { TransferMoneyResponse } from './transfer-response';

export interface ITransfer {
  transferMoney: (
    fromRepresentativeCpf: number,
    toRepresentativeCpf: number,
    amount: number
  ) => Promise<TransferMoneyResponse>;
}
