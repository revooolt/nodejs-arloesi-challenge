import { Either, left, right } from '../../../either';
import { IBankAccountData } from './bank-account-data';
import { InvalidAccountNumberError } from './errors/invalid-account-number-error';
import { InvalidAgencyNumberError } from './errors/invalid-agency-number-error';
import { InvalidRepresentativeAddressError } from './errors/invalid-representative-address-error';
import { InvalidRepresentativeBirthdateError } from './errors/invalid-representative-birthdate-error';
import { InvalidRepresentativeCpfError } from './errors/invalid-representative-cpf-error';
import { InvalidRepresentativeEmailError } from './errors/invalid-representative-email-error';
import { InvalidRepresentativeNameError } from './errors/invalid-representative-name-error';
import { InvalidRepresentativePhoneNumberError } from './errors/invalid-representative-phone-number-error';
import { AccountNumber } from './value-objects/account-number';
import { AgencyNumber } from './value-objects/agency-number';
import { RepresentativeAddress } from './value-objects/representative-address';
import { RepresentativeBirthdate } from './value-objects/representative-birthdate';
import { RepresentativeCpf } from './value-objects/representative-cpf';
import { RepresentativeEmail } from './value-objects/representative-email';
import { RepresentativeName } from './value-objects/representative-name';
import { RepresentativePhoneNumber } from './value-objects/representative-phone-number';

export class BankAccount {
  public readonly accountNumber: AccountNumber;
  public readonly agencyNumber: AgencyNumber;
  public readonly balance: number;
  public readonly openingDate: Date;
  public readonly representativeCpf: RepresentativeCpf;
  public readonly representativeName: RepresentativeName;
  public readonly representativeEmail: RepresentativeEmail;
  public readonly representativeBirthdate: RepresentativeBirthdate;
  public readonly representativeAddress: RepresentativeAddress;
  public readonly representativePhoneNumber: RepresentativePhoneNumber;

  private constructor(
    accountNumber: AccountNumber,
    agencyNumber: AgencyNumber,
    representativeCpf: RepresentativeCpf,
    representativeName: RepresentativeName,
    representativeEmail: RepresentativeEmail,
    representativeBirthdate: RepresentativeBirthdate,
    representativeAddress: RepresentativeAddress,
    representativePhoneNumber: RepresentativePhoneNumber,
    balance?: number,
    openingDate?: Date
  ) {
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
    this.balance = balance ?? 0;
    this.openingDate = openingDate ?? new Date();
    this.representativeCpf = representativeCpf;
    this.representativeName = representativeName;
    this.representativeEmail = representativeEmail;
    this.representativeBirthdate = representativeBirthdate;
    this.representativeAddress = representativeAddress;
    this.representativePhoneNumber = representativePhoneNumber;
  }

  static create(
    bankAccount: IBankAccountData
  ): Either<
    | InvalidAccountNumberError
    | InvalidAgencyNumberError
    | InvalidRepresentativeCpfError
    | InvalidRepresentativeNameError
    | InvalidRepresentativeEmailError
    | InvalidRepresentativeBirthdateError
    | InvalidRepresentativeAddressError
    | InvalidRepresentativePhoneNumberError,
    BankAccount
  > {
    const accountNumberOrError: Either<
      InvalidAccountNumberError,
      AccountNumber
    > = AccountNumber.create(bankAccount.accountNumber);
    const agencyNumberOrError: Either<InvalidAgencyNumberError, AgencyNumber> =
      AgencyNumber.create(bankAccount.agencyNumber);

    const representativeCpfOrError: Either<
      InvalidRepresentativeCpfError,
      RepresentativeCpf
    > = RepresentativeCpf.create(bankAccount.representativeCpf);

    const representativeNameOrError: Either<
      InvalidRepresentativeNameError,
      RepresentativeName
    > = RepresentativeName.create(bankAccount.representativeName);

    const representativeEmailOrError: Either<
      InvalidRepresentativeEmailError,
      RepresentativeEmail
    > = RepresentativeEmail.create(bankAccount.representativeEmail);

    const representativeBirthdateOrError: Either<
      InvalidRepresentativeBirthdateError,
      RepresentativeBirthdate
    > = RepresentativeBirthdate.create(bankAccount.representativeBirthdate);

    const representativeAddressOrError: Either<
      InvalidRepresentativeAddressError,
      RepresentativeAddress
    > = RepresentativeAddress.create(bankAccount.representativeAddress);

    const representativePhoneNumberOrError: Either<
      InvalidRepresentativePhoneNumberError,
      RepresentativePhoneNumber
    > = RepresentativePhoneNumber.create(bankAccount.representativePhoneNumber);

    if (accountNumberOrError.isLeft()) {
      return left(accountNumberOrError.value);
    }
    if (agencyNumberOrError.isLeft()) {
      return left(agencyNumberOrError.value);
    }
    if (representativeCpfOrError.isLeft()) {
      return left(representativeCpfOrError.value);
    }
    if (representativeNameOrError.isLeft()) {
      return left(representativeNameOrError.value);
    }
    if (representativeEmailOrError.isLeft()) {
      return left(representativeEmailOrError.value);
    }
    if (representativeBirthdateOrError.isLeft()) {
      return left(representativeBirthdateOrError.value);
    }
    if (representativeAddressOrError.isLeft()) {
      return left(representativeAddressOrError.value);
    }
    if (representativePhoneNumberOrError.isLeft()) {
      return left(representativePhoneNumberOrError.value);
    }

    const accountNumber: AccountNumber = accountNumberOrError.value;
    const agencyNumber: AgencyNumber = agencyNumberOrError.value;
    const representativeCpf: RepresentativeCpf = representativeCpfOrError.value;
    const representativeName: RepresentativeName =
      representativeNameOrError.value;
    const representativeEmail: RepresentativeEmail =
      representativeEmailOrError.value;
    const representativeBirthdate: RepresentativeBirthdate =
      representativeBirthdateOrError.value;
    const representativeAddress: RepresentativeAddress =
      representativeAddressOrError.value;
    const representativePhoneNumber: RepresentativePhoneNumber =
      representativePhoneNumberOrError.value;

    return right(
      new BankAccount(
        accountNumber,
        agencyNumber,
        representativeCpf,
        representativeName,
        representativeEmail,
        representativeBirthdate,
        representativeAddress,
        representativePhoneNumber
      )
    );
  }
}
