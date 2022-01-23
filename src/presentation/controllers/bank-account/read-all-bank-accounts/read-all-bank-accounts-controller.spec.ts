import { IBankAccountData } from '../../../../domain/entities/bank-account/bank-account-data';
import { InMemoryBankAccountRepository } from '../../../../usecases/in-memory-bank-account-repository/in-memory-bank-account-repository';
import { ReadAllBankAccounts } from '../../../../usecases/read-all-bank-accounts/read-all-bank-accounts';

describe('Read all bank accounts controller', () => {
  test('Should return 200 and all bank accounts', async () => {
    const bankAccounts: IBankAccountData[] = [
      {
        accountNumber: 12345,
        agencyNumber: 12345,
        balance: 12345,
        openingDate: new Date(),
        representativeCpf: 12345,
        representativeName: 'any_name',
        representativeEmail: 'any_email@mail.com',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address',
        representativePhoneNumber: 12345,
      },
      {
        accountNumber: 123,
        agencyNumber: 123,
        balance: 123,
        openingDate: new Date(),
        representativeCpf: 123,
        representativeName: 'any_name2',
        representativeEmail: 'any_email@mail.com2',
        representativeBirthdate: new Date(),
        representativeAddress: 'any_address2',
        representativePhoneNumber: 123,
      },
    ];
    const bankAccountRepo = new InMemoryBankAccountRepository(bankAccounts);
    const sut = new ReadAllBankAccounts(bankAccountRepo);
    const allBankAccounts = await sut.readAllBankAccounts();
    expect(allBankAccounts).toHaveLength(2);
  });
});
