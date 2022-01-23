import { DeleteAccountResponse } from './delete-account-response';

export interface IDeleteBankAccount {
  deleteBankAccount: (
    representativeCpf: number
  ) => Promise<DeleteAccountResponse>;
}
