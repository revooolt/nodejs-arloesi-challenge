import { IDomainError } from './domain-error';

export class InvalidRepresentativeBirthdateError
  extends Error
  implements IDomainError
{
  constructor() {
    super('Birthdate is required');
    this.name = 'InvalidRepresentativeBirthdateError';
  }
}
