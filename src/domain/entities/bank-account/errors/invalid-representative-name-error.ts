import { IDomainError } from './domain-error';

export class InvalidRepresentativeNameError
  extends Error
  implements IDomainError
{
  constructor() {
    super(`Name is required`);
    this.name = 'InvalidRepresentativeNameError';
  }
}
