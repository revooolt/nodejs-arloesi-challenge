import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';

export interface IBankAccountRepository {
  findAllBankAccounts: () => Promise<IBankAccountData[]>;
  findBankAccountByCpf: (
    representativeCpf: number
  ) => Promise<IBankAccountData>;
  exists: (representativeCpf: number) => Promise<boolean>;
  add: (bankAccount: IBankAccountData) => Promise<IBankAccountData>;
  delete: (representativeCpf: number) => Promise<void>;
  depositMoney: (representativeCpf: number, amount: number) => Promise<void>;
  withdrawMoney: (representativeCpf: number, amount: number) => Promise<void>;
  transferMoney: (
    fromRepresentativeCpf: number,
    toRepresentativeCpf: number,
    amount: number
  ) => Promise<void>;
  updateBankAccountData: (
    representativeCpf: number,
    newRepresentativeEmail?: string,
    newRepresentativeAddress?: string,
    newRepresentativePhoneNumber?: number
  ) => Promise<void>;
}
