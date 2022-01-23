import { Either, left, right } from '../../../../either';
import { InvalidAccountNumberError } from '../errors/invalid-account-number-error';

export class AccountNumber {
  private readonly accountNumber: number;

  private constructor(accountNumber: number) {
    this.accountNumber = accountNumber;
  }

  static create(
    accountNumber: number
  ): Either<InvalidAccountNumberError, AccountNumber> {
    if (!AccountNumber.validate(accountNumber)) {
      return left(new InvalidAccountNumberError());
    }
    return right(new AccountNumber(accountNumber));
  }

  get value(): number {
    return this.accountNumber;
  }

  static validate(accountNumber: number): boolean {
    if (!accountNumber) {
      return false;
    }
    return true;
  }
}
