import { Either, left, right } from '../../../../either';
import { InvalidRepresentativeAddressError } from '../errors/invalid-representative-address-error';

export class RepresentativeAddress {
  private readonly address: string;

  private constructor(address: string) {
    this.address = address;
  }

  static create(
    address: string
  ): Either<InvalidRepresentativeAddressError, RepresentativeAddress> {
    if (!RepresentativeAddress.validate(address)) {
      return left(new InvalidRepresentativeAddressError());
    }
    return right(new RepresentativeAddress(address));
  }

  get value(): string {
    return this.address;
  }

  static validate(address: string): boolean {
    if (!address) {
      return false;
    }
    return true;
  }
}
