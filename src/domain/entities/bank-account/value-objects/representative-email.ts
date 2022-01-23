import { Either, left, right } from '../../../../either';
import { InvalidRepresentativeEmailError } from '../errors/invalid-representative-email-error';

export class RepresentativeEmail {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static create(
    email: string
  ): Either<InvalidRepresentativeEmailError, RepresentativeEmail> {
    if (!RepresentativeEmail.validate(email)) {
      return left(new InvalidRepresentativeEmailError());
    }
    return right(new RepresentativeEmail(email));
  }

  get value(): string {
    return this.email;
  }

  static validate(email: string): boolean {
    if (!email) {
      return false;
    }
    return true;
  }
}
