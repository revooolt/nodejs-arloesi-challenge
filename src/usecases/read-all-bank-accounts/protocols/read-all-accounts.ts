import { ReadAllAccountsResponse } from './read-all-accounts-response';

export interface IReadAllAccounts {
  readAllBankAccounts: () => Promise<ReadAllAccountsResponse>;
}
