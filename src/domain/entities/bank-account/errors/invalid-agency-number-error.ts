import { IDomainError } from './domain-error';

export class InvalidAgencyNumberError extends Error implements IDomainError {
  constructor() {
    super('Agency number is required');
    this.name = 'InvalidAgencyNumberError';
  }
}
