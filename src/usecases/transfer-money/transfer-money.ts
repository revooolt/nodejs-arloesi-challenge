import { IBankAccountRepository } from '../ports/bank-account-repository';
import { ITransfer } from './protocols/transfer';
import { TransferMoneyResponse } from './protocols/transfer-response';

export class TransferMoney implements ITransfer {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  async transferMoney(
    fromRepresentativeCpf: number,
    toRepresentativeCpf: number,
    amount: number
  ): Promise<TransferMoneyResponse> {
    const senderAccount = await this.bankAccountRepository.findBankAccountByCpf(
      fromRepresentativeCpf
    );
    if (amount < 1 || amount > senderAccount.balance) {
      throw new Error('An has occurred while sending the money');
    }
    await this.bankAccountRepository.transferMoney(
      fromRepresentativeCpf,
      toRepresentativeCpf,
      amount
    );
  }
}
