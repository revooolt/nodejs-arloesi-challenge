import { IBankAccountRepository } from '../ports/bank-account-repository';
import { IWithdraw } from './protocols/withdraw';
import { WithdrawMoneyResponse } from './protocols/withdraw-response';

export class WithdrawMoney implements IWithdraw {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async withdrawMoney(
    representativeCpf: number,
    amount: number
  ): Promise<WithdrawMoneyResponse> {
    const withdrawerAccount =
      await this.bankAccountRepository.findBankAccountByCpf(representativeCpf);
    if (amount > withdrawerAccount.balance || amount < 1) {
      throw new Error('An error has occurred while withdrawing the money');
    }
    await this.bankAccountRepository.withdrawMoney(representativeCpf, amount);
  }
}
