import { IBankAccountData } from '../../../domain/entities/bank-account/bank-account-data';
import { CreateAccountResponse } from './create-account-response';

export interface ICreateAccount {
  createBankAccount: (
    bankAccount: IBankAccountData
  ) => Promise<CreateAccountResponse>;
}
