import { IBankAccountRepository } from '../ports/bank-account-repository';
import { IUpdateAccountData } from './protocols/update-account-data';
import { UpdateBankAccountDataResponse } from './protocols/update-account-data-response';

export class UpdateBankAccountData implements IUpdateAccountData {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async updateBankAccountData(
    representativeCpf: number,
    newRepresentativeEmail?: string,
    newRepresentativeAddress?: string,
    newRepresentativePhoneNumber?: number
  ): Promise<UpdateBankAccountDataResponse> {
    await this.bankAccountRepository.updateBankAccountData(
      representativeCpf,
      newRepresentativeEmail,
      newRepresentativeAddress,
      newRepresentativePhoneNumber
    );
  }
}
