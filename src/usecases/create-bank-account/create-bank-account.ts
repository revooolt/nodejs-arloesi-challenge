import { BankAccount } from '../../domain/entities/bank-account/bank-account';
import { IBankAccountData } from '../../domain/entities/bank-account/bank-account-data';
import { InvalidAccountNumberError } from '../../domain/entities/bank-account/errors/invalid-account-number-error';
import { InvalidAgencyNumberError } from '../../domain/entities/bank-account/errors/invalid-agency-number-error';
import { InvalidRepresentativeAddressError } from '../../domain/entities/bank-account/errors/invalid-representative-address-error';
import { InvalidRepresentativeBirthdateError } from '../../domain/entities/bank-account/errors/invalid-representative-birthdate-error';
import { InvalidRepresentativeCpfError } from '../../domain/entities/bank-account/errors/invalid-representative-cpf-error';
import { InvalidRepresentativeEmailError } from '../../domain/entities/bank-account/errors/invalid-representative-email-error';
import { InvalidRepresentativeNameError } from '../../domain/entities/bank-account/errors/invalid-representative-name-error';
import { InvalidRepresentativePhoneNumberError } from '../../domain/entities/bank-account/errors/invalid-representative-phone-number-error';
import { Either, left, right } from '../../either';
import { IBankAccountRepository } from '../ports/bank-account-repository';
import { ICreateAccount } from './protocols/create-account';
import { CreateAccountResponse } from './protocols/create-account-response';

export class CreateBankAccount implements ICreateAccount {
  private readonly bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }
  async createBankAccount(
    bankAccountData: IBankAccountData
  ): Promise<CreateAccountResponse> {
    const bankAccountOrError: Either<
      | InvalidAccountNumberError
      | InvalidAgencyNumberError
      | InvalidRepresentativeCpfError
      | InvalidRepresentativeNameError
      | InvalidRepresentativeEmailError
      | InvalidRepresentativeBirthdateError
      | InvalidRepresentativeAddressError
      | InvalidRepresentativePhoneNumberError,
      BankAccount
    > = BankAccount.create(bankAccountData);

    if (bankAccountOrError.isLeft()) {
      return left(bankAccountOrError.value);
    }

    const bankAccount: BankAccount = bankAccountOrError.value;
    const exists = this.bankAccountRepository.exists(
      bankAccount.representativeCpf.value
    );

    if ((await exists).valueOf()) {
      left(new Error('A bank account registered with that CPF already exists'));
    }

    await this.bankAccountRepository.add({
      accountNumber: bankAccount.accountNumber.value,
      agencyNumber: bankAccount.agencyNumber.value,
      balance: bankAccount.balance,
      openingDate: bankAccount.openingDate,
      representativeCpf: bankAccount.representativeCpf.value,
      representativeName: bankAccount.representativeName.value,
      representativeEmail: bankAccount.representativeEmail.value,
      representativeBirthdate: bankAccount.representativeBirthdate.value,
      representativeAddress: bankAccount.representativeAddress.value,
      representativePhoneNumber: bankAccount.representativePhoneNumber.value,
    });
    return right(bankAccountData);
  }
}
