import { IBankAccountRepository } from '../ports/bank-account-repository';
import { IReadAllAccounts } from './protocols/read-all-accounts';
import { ReadAllAccountsResponse } from './protocols/read-all-accounts-response';

export class ReadAllBankAccounts implements IReadAllAccounts {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async readAllBankAccounts(): Promise<ReadAllAccountsResponse> {
    const bankAccounts = await this.bankAccountRepository.findAllBankAccounts();
    return bankAccounts;
  }
}
