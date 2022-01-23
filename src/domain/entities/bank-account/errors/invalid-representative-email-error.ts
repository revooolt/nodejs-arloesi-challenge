import { IDomainError } from './domain-error';

export class InvalidRepresentativeEmailError
  extends Error
  implements IDomainError
{
  constructor() {
    super('Email is required');
    this.name = 'InvalidRepresentativeEmailError';
  }
}
