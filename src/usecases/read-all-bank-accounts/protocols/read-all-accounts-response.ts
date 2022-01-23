import { IBankAccountData } from '../../../domain/entities/bank-account/bank-account-data';

export type ReadAllAccountsResponse = Promise<IBankAccountData[]>;
