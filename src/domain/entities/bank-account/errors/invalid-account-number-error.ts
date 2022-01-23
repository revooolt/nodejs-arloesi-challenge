import { IDomainError } from './domain-error';

export class InvalidAccountNumberError extends Error implements IDomainError {
  constructor() {
    super('Account number is required');
    this.name = 'InvalidAccountNumberError';
  }
}
