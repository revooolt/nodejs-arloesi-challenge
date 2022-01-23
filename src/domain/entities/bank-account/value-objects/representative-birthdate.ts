import { Either, left, right } from '../../../../either';
import { InvalidRepresentativeBirthdateError } from '../errors/invalid-representative-birthdate-error';

export class RepresentativeBirthdate {
  private readonly representativeBirthdate: Date;

  private constructor(representativeBirthdate: Date) {
    this.representativeBirthdate = representativeBirthdate;
  }

  static create(
    representativeBirthdate: Date
  ): Either<InvalidRepresentativeBirthdateError, RepresentativeBirthdate> {
    if (!RepresentativeBirthdate.validate(representativeBirthdate)) {
      return left(new InvalidRepresentativeBirthdateError());
    }
    return right(new RepresentativeBirthdate(representativeBirthdate));
  }

  get value(): Date {
    return this.representativeBirthdate;
  }

  static validate(representativeBirthdate: Date): boolean {
    if (!representativeBirthdate) {
      return false;
    }
    return true;
  }
}
