/* eslint-disable no-restricted-syntax */
import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { IBankAccountRepository } from '../ports/bank-account-repository';

export class InMemoryBankAccountRepository implements IBankAccountRepository {
  bankAccounts: IBankAccountData[] = [];
  constructor(bankAccounts: IBankAccountData[]) {
    this.bankAccounts = bankAccounts;
  }

  async findAllBankAccounts(): Promise<IBankAccountData[]> {
    return this.bankAccounts;
  }

  async findBankAccountByCpf(
    representativeCpf: number
  ): Promise<IBankAccountData> {
    let bA: IBankAccountData;
    for (bA of this.bankAccounts) {
      if (bA.representativeCpf === representativeCpf) {
        return bA;
      }
    }
    return null;
  }

  async exists(representativeCpf: number): Promise<boolean> {
    if ((await this.findBankAccountByCpf(representativeCpf)) == null) {
      return false;
    }
    return true;
  }

  async add(bankAccount: IBankAccountData): Promise<IBankAccountData> {
    const exists = await this.exists(bankAccount.representativeCpf);
    if (!exists) {
      this.bankAccounts.push(bankAccount);
    }
    return bankAccount;
  }

  async delete(representativeCpf: number): Promise<void> {
    const data = await this.findAllBankAccounts();
    data.splice(
      data.findIndex(
        (bankAccount) => bankAccount.representativeCpf === representativeCpf
      )
    );
  }

  async depositMoney(representativeCpf: number, amount: number): Promise<void> {
    const receiverAccount = await this.findBankAccountByCpf(representativeCpf);
    receiverAccount.balance += amount;
  }

  async withdrawMoney(
    representativeCpf: number,
    amount: number
  ): Promise<void> {
    const receiverAccount = await this.findBankAccountByCpf(representativeCpf);
    receiverAccount.balance -= amount;
  }

  async transferMoney(
    fromRepresentativeCpf: number,
    toRepresentativeCpf: number,
    amount: number
  ): Promise<void> {
    const senderAccount = await this.findBankAccountByCpf(
      fromRepresentativeCpf
    );
    const receiverAccount = await this.findBankAccountByCpf(
      toRepresentativeCpf
    );
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
  }

  async updateBankAccountData(
    representativeCpf: number,
    newRepresentativeEmail?: string,
    newRepresentativeAddress?: string,
    newRepresentativePhoneNumber?: number
  ): Promise<void> {
    const bankAccount = await this.findBankAccountByCpf(representativeCpf);
    bankAccount.representativeEmail =
      newRepresentativeEmail || bankAccount.representativeEmail;

    bankAccount.representativeAddress =
      newRepresentativeAddress || bankAccount.representativeAddress;

    bankAccount.representativePhoneNumber =
      newRepresentativePhoneNumber || bankAccount.representativePhoneNumber;
  }
}
