import { IDomainError } from './domain-error';

export class InvalidRepresentativePhoneNumberError
  extends Error
  implements IDomainError
{
  constructor() {
    super('Phone number is required');
    this.name = 'InvalidRepresentativePhoneNumberError';
  }
}
