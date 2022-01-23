import { Either, left, right } from '../../../../either';
import { InvalidAgencyNumberError } from '../errors/invalid-agency-number-error';

export class AgencyNumber {
  private readonly agencyNumber: number;

  private constructor(agencyNumber: number) {
    this.agencyNumber = agencyNumber;
  }

  static create(
    agencyNumber: number
  ): Either<InvalidAgencyNumberError, AgencyNumber> {
    if (!AgencyNumber.validate(agencyNumber)) {
      return left(new InvalidAgencyNumberError());
    }
    return right(new AgencyNumber(agencyNumber));
  }

  get value(): number {
    return this.agencyNumber;
  }

  static validate(agencyNumber: number): boolean {
    if (!agencyNumber) {
      return false;
    }
    return true;
  }
}
