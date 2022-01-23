import { IControllerError } from './controller-error';

export class ServerError extends Error implements IControllerError {
  constructor() {
    super('Internal Server Error');
    this.name = 'ServerError';
  }
}
