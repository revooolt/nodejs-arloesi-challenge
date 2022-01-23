import { IBankAccountRepository } from '../ports/bank-account-repository';
import { IDeleteBankAccount } from './protocols/delete-account';
import { DeleteAccountResponse } from './protocols/delete-account-response';

export class DeleteBankAccount implements IDeleteBankAccount {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async deleteBankAccount(
    representativeCpf: number
  ): Promise<DeleteAccountResponse> {
    const bankAccount = await this.bankAccountRepository.findBankAccountByCpf(
      representativeCpf
    );
    await this.bankAccountRepository.delete(bankAccount.representativeCpf);
  }
}
