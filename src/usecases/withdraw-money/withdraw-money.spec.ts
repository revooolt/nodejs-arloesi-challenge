import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { InMemoryBankAccountRepository } from '../in-memory-bank-account-repository/in-memory-bank-account-repository';
import { WithdrawMoney } from './withdraw-money';

describe('Withdraw money UseCase', () => {
  test('Should withdraw money if withdrawal account was found', async () => {
    const bankAccounts: IBankAccountData[] = [
      {
        accountNumber: 12345,
        agencyNumber: 12345,
        balance: 15,
        openingDate: new Date(),
        representativeCpf: 123,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 45984285262,
      },
    ];
    const bankAccountRepo = new InMemoryBankAccountRepository(bankAccounts);
    const sut = new WithdrawMoney(bankAccountRepo);
    await sut.withdrawMoney(123, 10);
    const verifyBalance = bankAccounts.find((receiver) => receiver.balance);
    expect(verifyBalance.balance).toEqual(5);
  });
});
