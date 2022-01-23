/* eslint-disable object-shorthand */
import { getRepository } from 'typeorm';

import { IBankAccountData } from '../../../../../../domain/entities/bank-account/bank-account-data';
import { IBankAccountRepository } from '../../../../../../usecases/ports/bank-account-repository';
import { BankAccount } from '../entities/bank-account';

export class BankAccountTypeORMRepository implements IBankAccountRepository {
  async findAllBankAccounts(): Promise<IBankAccountData[]> {
    const bankAccountRepository = getRepository(BankAccount);
    const bankAccounts = await bankAccountRepository.find();
    return bankAccounts;
  }

  async findBankAccountByCpf(
    representativeCpf: number
  ): Promise<IBankAccountData> {
    const bankAccountRepository = getRepository(BankAccount);
    const result = await bankAccountRepository.findOne({
      where: { representativeCpf: representativeCpf },
    });
    return result;
  }

  async exists(representativeCpf: number): Promise<boolean> {
    const result = await this.findBankAccountByCpf(representativeCpf);
    if (result != null) {
      if (result.representativeCpf === representativeCpf) {
        return true;
      }
    }
    return false;
  }

  async add(bankAccountData: IBankAccountData): Promise<IBankAccountData> {
    const bankAccountRepository = getRepository(BankAccount);
    const exists = await this.exists(bankAccountData.representativeCpf);
    if (exists) {
      return null;
    }

    const bankAccount = await bankAccountRepository.create(bankAccountData);
    await bankAccountRepository.save(bankAccount);
    return bankAccount;
  }

  async delete(representativeCpf: number): Promise<void> {
    const bankAccountRepository = getRepository(BankAccount);
    const bankAccount = await bankAccountRepository.findOne({
      where: { representativeCpf: representativeCpf },
    });

    if (bankAccount) {
      await bankAccountRepository.delete(bankAccount);
    }
  }

  async depositMoney(representativeCpf: number, amount: number): Promise<void> {
    const bankAccountRepository = getRepository(BankAccount);
    const receiverAccount = await bankAccountRepository.findOne(
      representativeCpf
    );

    receiverAccount.balance += amount;
    await bankAccountRepository.save(receiverAccount);
  }

  async withdrawMoney(
    representativeCpf: number,
    amount: number
  ): Promise<void> {
    const bankAccountRepository = getRepository(BankAccount);
    const receiverAccount = await bankAccountRepository.findOne(
      representativeCpf
    );

    receiverAccount.balance -= amount;
    await bankAccountRepository.save(receiverAccount);
  }

  async transferMoney(
    fromRepresentativeCpf: number,
    toRepresentativeCpf: number,
    amount: number
  ): Promise<void> {
    const bankAccountRepository = getRepository(BankAccount);
    const senderAccount = await bankAccountRepository.findOne(
      fromRepresentativeCpf
    );
    const receiverAccount = await bankAccountRepository.findOne(
      toRepresentativeCpf
    );

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    await bankAccountRepository.save(senderAccount);
    await bankAccountRepository.save(receiverAccount);
  }

  async updateBankAccountData(
    representativeCpf: number,
    newRepresentativeEmail?: string,
    newRepresentativeAddress?: string,
    newRepresentativePhoneNumber?: number
  ): Promise<void> {
    const bankAccountRepository = getRepository(BankAccount);
    const bankAccount = await bankAccountRepository.findOne(representativeCpf);

    bankAccount.representativeEmail =
      newRepresentativeEmail || bankAccount.representativeEmail;

    bankAccount.representativeAddress =
      newRepresentativeAddress || bankAccount.representativeAddress;

    bankAccount.representativePhoneNumber =
      newRepresentativePhoneNumber || bankAccount.representativePhoneNumber;

    await bankAccountRepository.save(bankAccount);
  }
}
