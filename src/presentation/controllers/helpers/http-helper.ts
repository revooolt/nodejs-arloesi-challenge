/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from '../errors/server-error';
import { IHttpResponse } from '../ports/http';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error.message,
});

export const ok = (data?: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const noContentSuccess = (): IHttpResponse => ({
  statusCode: 204,
  body: '',
});
