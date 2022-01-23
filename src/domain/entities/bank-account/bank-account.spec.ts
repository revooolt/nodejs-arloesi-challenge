import { left } from '../../../either';
import { BankAccount } from './bank-account';
import { InvalidAccountNumberError } from './errors/invalid-account-number-error';
import { InvalidAgencyNumberError } from './errors/invalid-agency-number-error';
import { InvalidRepresentativeAddressError } from './errors/invalid-representative-address-error';
import { InvalidRepresentativeCpfError } from './errors/invalid-representative-cpf-error';
import { InvalidRepresentativeEmailError } from './errors/invalid-representative-email-error';
import { InvalidRepresentativeNameError } from './errors/invalid-representative-name-error';
import { InvalidRepresentativePhoneNumberError } from './errors/invalid-representative-phone-number-error';

describe('BankAccount domain entity', () => {
  test('Should not create bank account with invalid account number (not provided)', () => {
    let invalidAccountNumber;
    const bankAccount = BankAccount.create({
      accountNumber: invalidAccountNumber,
      agencyNumber: 123,
      representativeCpf: 123,
      representativeName: 'any_name',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidAccountNumberError()));
  });

  test('Should not create bank account with invalid agency number (not provided)', () => {
    let invalidAgencyNumber;
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: invalidAgencyNumber,
      representativeCpf: 123,
      representativeName: 'any_name',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidAgencyNumberError()));
  });

  test('Should not create bank account with invalid representative CPF (not provided)', () => {
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: 123,
      representativeCpf: 0,
      representativeName: 'any_name',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidRepresentativeCpfError()));
  });

  test('Should not create bank account with invalid representative name (not provided)', () => {
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: 123,
      representativeCpf: 123,
      representativeName: '',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidRepresentativeNameError()));
  });

  test('Should not create bank account with invalid representative email (not provided)', () => {
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: 123,
      representativeCpf: 123,
      representativeName: 'any_name',
      representativeEmail: '',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidRepresentativeEmailError()));
  });

  test('Should not create bank account with invalid representative address (not provided)', () => {
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: 123,
      representativeCpf: 123,
      representativeName: 'any_name',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: '',
      representativePhoneNumber: 123,
    });
    expect(bankAccount).toEqual(left(new InvalidRepresentativeAddressError()));
  });

  test('Should not create bank account with invalid representative phone number (not provided)', () => {
    let invalidRepresentativePhoneNumber;
    const bankAccount = BankAccount.create({
      accountNumber: 123,
      agencyNumber: 123,
      representativeCpf: 123,
      representativeName: 'any_name',
      representativeEmail: 'any_email@mail.com',
      representativeBirthdate: new Date(),
      representativeAddress: 'any_address',
      representativePhoneNumber: invalidRepresentativePhoneNumber,
    });
    expect(bankAccount).toEqual(
      left(new InvalidRepresentativePhoneNumberError())
    );
  });
});
