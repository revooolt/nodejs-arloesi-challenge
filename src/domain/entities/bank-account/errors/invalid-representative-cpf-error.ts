import { IDomainError } from './domain-error';

export class InvalidRepresentativeCpfError
  extends Error
  implements IDomainError
{
  constructor() {
    super('CPF is required');
    this.name = 'InvalidRepresentativeCpfError';
  }
}
