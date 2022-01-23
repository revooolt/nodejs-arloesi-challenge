import { IDomainError } from './domain-error';

export class InvalidRepresentativeAddressError
  extends Error
  implements IDomainError
{
  constructor() {
    super('Address is required.');
    this.name = 'InvalidRepresentativeAddressError';
  }
}
