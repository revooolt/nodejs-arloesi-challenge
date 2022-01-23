import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { InMemoryBankAccountRepository } from '../in-memory-bank-account-repository/in-memory-bank-account-repository';
import { DepositMoney } from './deposit-money';

describe('Deposit money UseCase', () => {
  test('Should deposit money if receiver account was found', async () => {
    const bankAccounts: IBankAccountData[] = [
      {
        accountNumber: 12345,
        agencyNumber: 12345,
        balance: 50,
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
    const sut = new DepositMoney(bankAccountRepo);
    await sut.depositMoney(123, 100);
    const verifyBalance = bankAccounts.find(
      (receiver) => receiver.representativeCpf
    );
    expect(verifyBalance.balance).toEqual(150);
  });
});
