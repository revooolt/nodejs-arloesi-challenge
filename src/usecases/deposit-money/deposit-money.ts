import { IBankAccountRepository } from '../ports/bank-account-repository';
import { IDeposit } from './protocols/deposit';
import { DepositResponse } from './protocols/deposit-response';

export class DepositMoney implements IDeposit {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async depositMoney(
    representativeCpf: number,
    amount: number
  ): Promise<DepositResponse> {
    await this.bankAccountRepository.depositMoney(representativeCpf, amount);
  }
}
