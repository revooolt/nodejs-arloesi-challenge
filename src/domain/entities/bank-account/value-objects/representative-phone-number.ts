import { Either, left, right } from '../../../../either';
import { InvalidRepresentativePhoneNumberError } from '../errors/invalid-representative-phone-number-error';

export class RepresentativePhoneNumber {
  private readonly representativePhoneNumber: number;

  private constructor(representativePhoneNumber: number) {
    this.representativePhoneNumber = representativePhoneNumber;
  }

  static create(
    representativePhoneNumber: number
  ): Either<InvalidRepresentativePhoneNumberError, RepresentativePhoneNumber> {
    if (!RepresentativePhoneNumber.validate(representativePhoneNumber)) {
      return left(new InvalidRepresentativePhoneNumberError());
    }
    return right(new RepresentativePhoneNumber(representativePhoneNumber));
  }

  get value(): number {
    return this.representativePhoneNumber;
  }

  static validate(representativePhoneNumber: number): boolean {
    if (!representativePhoneNumber) {
      return false;
    }
    return true;
  }
}
