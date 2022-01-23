/* eslint-disable no-restricted-syntax */
import { ITransfer } from '../../../../usecases/transfer-money/protocols/transfer';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, ok } from '../../helpers/http-helper';
import { IController } from '../../ports/controller';
import { IHttpRequest, IHttpResponse } from '../../ports/http';

export class TransferMoneyController implements IController {
  private readonly transferMoney: ITransfer;

  constructor(transferMoney: ITransfer) {
    this.transferMoney = transferMoney;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = [
      'fromRepresentativeCpf',
      'toRepresentativeCpf',
      'amount',
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    try {
      await this.transferMoney.transferMoney(
        httpRequest.body.fromRepresentativeCpf,
        httpRequest.body.toRepresentativeCpf,
        httpRequest.body.amount
      );
      return ok('Successfully sended money');
    } catch (error) {
      return badRequest(
        new Error('An error has occurred while sending the money')
      );
    }
  }
}
