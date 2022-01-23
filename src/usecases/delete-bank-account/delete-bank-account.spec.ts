import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { InMemoryBankAccountRepository } from '../in-memory-bank-account-repository/in-memory-bank-account-repository';

describe('Delete bank account UseCase', () => {
  test('Should delete bank account if representative CPF was found', async () => {
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
        representativePhoneNumber: 123,
      },
    ];
    const bankAccountRepo = new InMemoryBankAccountRepository(bankAccounts);
    await bankAccountRepo.delete(123);
    expect(bankAccounts).toHaveLength(0);
  });
});
