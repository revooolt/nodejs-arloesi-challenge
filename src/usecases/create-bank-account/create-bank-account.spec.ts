/* eslint-disable prefer-const */
import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { InvalidAccountNumberError } from '../../domain/entities/bank-account/errors/invalid-account-number-error';
import { InvalidAgencyNumberError } from '../../domain/entities/bank-account/errors/invalid-agency-number-error';
import { InvalidRepresentativeAddressError } from '../../domain/entities/bank-account/errors/invalid-representative-address-error';
import { InvalidRepresentativeBirthdateError } from '../../domain/entities/bank-account/errors/invalid-representative-birthdate-error';
import { InvalidRepresentativeCpfError } from '../../domain/entities/bank-account/errors/invalid-representative-cpf-error';
import { InvalidRepresentativeEmailError } from '../../domain/entities/bank-account/errors/invalid-representative-email-error';
import { InvalidRepresentativeNameError } from '../../domain/entities/bank-account/errors/invalid-representative-name-error';
import { InvalidRepresentativePhoneNumberError } from '../../domain/entities/bank-account/errors/invalid-representative-phone-number-error';
import { InMemoryBankAccountRepository } from '../in-memory-bank-account-repository/in-memory-bank-account-repository';
import { IBankAccountRepository } from '../ports/bank-account-repository';
import { CreateBankAccount } from './create-bank-account';

describe('Create bank account UseCase', () => {
  test('Should not create bank account without a account number', async () => {
    let accountNumber;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidAccountNumberError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a agency number', async () => {
    const accountNumber = 123;
    let agencyNumber;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidAgencyNumberError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative CPF', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    let representativeCpf;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativeCpfError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative name', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = '';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativeNameError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative email', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = '';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativeEmailError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative birthdate', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    let representativeBirthdate;
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativeBirthdateError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative address', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = '';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativeAddressError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should not create bank account without a representative phone number', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    let representativePhoneNumber;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    expect(error.value).toEqual(new InvalidRepresentativePhoneNumberError());
    expect(error.isLeft()).toBeTruthy();
  });

  test('Should create bank account if all data is provided', async () => {
    const accountNumber = 123;
    const agencyNumber = 123;
    const representativeCpf = 123;
    const representativeName = 'any_name';
    const representativeEmail = 'any_email@mail.com';
    const representativeBirthdate = new Date();
    const representativeAddress = 'any_address';
    const representativePhoneNumber = 123;
    let bankAccounts: IBankAccountData[] = [];
    const bankAccountRepository: IBankAccountRepository =
      new InMemoryBankAccountRepository(bankAccounts);
    const sut = new CreateBankAccount(bankAccountRepository);
    const error = await sut.createBankAccount({
      accountNumber,
      agencyNumber,
      representativeCpf,
      representativeName,
      representativeEmail,
      representativeBirthdate,
      representativeAddress,
      representativePhoneNumber,
    });
    const bankAccount =
      bankAccountRepository.findBankAccountByCpf(representativeCpf);
    expect((await bankAccount).representativeCpf).toEqual(123);
    expect(error.isRight()).toBeTruthy();
  });
});
