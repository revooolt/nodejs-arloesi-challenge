import { Either, left, right } from '../../../../either';
import { InvalidRepresentativeNameError } from '../errors/invalid-representative-name-error';

export class RepresentativeName {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  static create(
    name: string
  ): Either<InvalidRepresentativeNameError, RepresentativeName> {
    if (!RepresentativeName.validate(name)) {
      return left(new InvalidRepresentativeNameError());
    }
    return right(new RepresentativeName(name));
  }

  get value(): string {
    return this.name;
  }

  static validate(name: string): boolean {
    if (!name) {
      return false;
    }
    return true;
  }
}
